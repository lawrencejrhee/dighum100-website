import pandas as pd
import glob
import re

FILES = sorted(glob.glob("Major Table 20*.csv"))

MIN_APPLICANTS = 100

def load_year(path):
    df = pd.read_csv(path, sep="\t", encoding="utf-16")
    year = int(re.search(r"(20\d\d)", path).group(1))
    df["Year"] = year

    for col in ["Applicants", "Admits"]:
        df[col] = (
            df[col].astype(str).str.replace(",", "", regex=False)
            .str.strip().replace("", "0").astype(int)
        )
    return df[["Major name", "Broad discipline", "Applicants", "Admits", "Year"]]

def main():
    frames = [load_year(f) for f in FILES]
    allyears = pd.concat(frames, ignore_index=True)
    print(f"loaded {len(FILES)} files, {len(allyears)} rows, years {allyears['Year'].min()}-{allyears['Year'].max()}")

    # pooled admit rate: total admits over total applicants across all years
    pooled = (
        allyears.groupby("Major name")
        .agg(Applicants=("Applicants", "sum"),
             Admits=("Admits", "sum"),
             Discipline=("Broad discipline", "first"))
        .reset_index()
    )
    pooled["Admit_Rate"] = (pooled["Admits"] / pooled["Applicants"]).round(4)

    before = len(pooled)
    pooled = pooled[pooled["Applicants"] >= MIN_APPLICANTS]
    print(f"kept {len(pooled)} of {before} majors (>= {MIN_APPLICANTS} pooled applicants)")

    pooled = pooled.sort_values("Admit_Rate")
    pooled.to_csv("transfer_admit_by_major.csv", index=False)
    print(f"wrote transfer_admit_by_major.csv ({len(pooled)} rows)")

    print("\nLOWEST admit rate (most competitive for transfers):")
    print(pooled.head(10).to_string(index=False))
    print("\nHIGHEST admit rate:")
    print(pooled.tail(10).to_string(index=False))

if __name__ == "__main__":
    main()