import pandas as pd

FRESH = "Grad GPA.csv"
TRANS = "Grad GPA.csv"

def load_weighted(path, entry_label):
    df = pd.read_csv(path, sep="\t", encoding="utf-16")

    df = df.rename(columns={
        df.columns[0]: "Band",
        df.columns[1]: "Entry",
        df.columns[2]: "Metric",
    })
    year_cols = [c for c in df.columns if c.isdigit()]

    gpa = df[df["Metric"].str.contains("Gpa", case=False, na=False)].copy()
    size = df[df["Metric"].str.contains("Cohort", case=False, na=False)].copy()

    rows = []
    for year in year_cols:
        g = pd.to_numeric(gpa[year], errors="coerce").reset_index(drop=True)
        s = pd.to_numeric(
            size[year].astype(str).str.replace(",", "", regex=False),
            errors="coerce",
        ).reset_index(drop=True)

        # weight each band's GPA by its cohort size, only where both exist
        mask = g.notna() & s.notna()
        if mask.sum() == 0 or s[mask].sum() == 0:
            continue
        weighted = (g[mask] * s[mask]).sum() / s[mask].sum()
        rows.append({
            "Year": int(year),
            "Entry Type": entry_label,
            "Weighted GPA": round(weighted, 3),
            "Graduates": int(s[mask].sum()),
        })
    return pd.DataFrame(rows)

def main():
    fresh = load_weighted(FRESH, "Freshman")
    trans = load_weighted(TRANS, "Transfer")
    out = pd.concat([fresh, trans], ignore_index=True).sort_values(["Entry Type", "Year"])
    out.to_csv("gpa_trend.csv", index=False)
    print(f"wrote gpa_trend.csv ({len(out)} rows)")
    pivot = out.pivot(index="Year", columns="Entry Type", values="Weighted GPA")
    print(pivot.to_string())

if __name__ == "__main__":
    main()