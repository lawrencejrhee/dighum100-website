import pandas as pd

FILE_PATH = "UCB Students - Degree Recipients by Major - Degree Recipients by Major.csv"

COL_YEAR = "Academic Yr"
COL_MAJOR = "Major"
COL_ENTRY = "Entry Status Desc"
COL_COUNT = "Headcount"

ENTRY_KEEP = ["Freshman", "Transfer"]


def load(path):
    df = pd.read_csv(path)
    df[COL_COUNT] = (
        df[COL_COUNT].astype(str).str.replace(",", "", regex=False).astype(int)
    )
    return df


def transfer_share_by_major_year(df):
    df = df[df[COL_ENTRY].isin(ENTRY_KEEP)]
    grouped = (
        df.groupby([COL_MAJOR, COL_YEAR, COL_ENTRY])[COL_COUNT]
        .sum()
        .unstack(COL_ENTRY)
        .fillna(0)
    )
    grouped["Total"] = grouped.get("Freshman", 0) + grouped.get("Transfer", 0)
    grouped["Transfer_Share"] = (
        grouped.get("Transfer", 0) / grouped["Total"]
    ).round(3)
    return grouped.reset_index()


def main():
    df = load(FILE_PATH)
    shares = transfer_share_by_major_year(df)

    print("\n=== CDSS Computer Science, transfer share by year ===")
    cs = shares[shares[COL_MAJOR].str.contains("Computer Science", case=False, na=False)]
    print(cs[[COL_MAJOR, COL_YEAR, "Freshman", "Transfer", "Total", "Transfer_Share"]]
          .to_string(index=False))

    print("\n=== Majors ranked by avg transfer share (>=100 total recipients) ===")
    avg = (
        shares.groupby(COL_MAJOR)
        .agg(avg_share=("Transfer_Share", "mean"),
             total_recipients=("Total", "sum"))
        .reset_index()
    )
    avg = avg[avg["total_recipients"] >= 100].sort_values("avg_share")
    avg["avg_share"] = avg["avg_share"].round(3)
    print("\nLOWEST transfer share (most closed to transfers):")
    print(avg.head(12).to_string(index=False))
    print("\nHIGHEST transfer share (most open to transfers):")
    print(avg.tail(12).to_string(index=False))
    avg.sort_values("avg_share", ascending=False).to_csv(
        "transfer_share_by_major.csv", index=False
    )


if __name__ == "__main__":
    main()