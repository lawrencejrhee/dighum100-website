import pandas as pd

FILE_PATH = "UCB Students - Graduation & Retention Rates - Grad Rates.csv"

COL_YEAR = "Academic Yr"
COL_ENTRY = "Entry Type"
COL_BAND = "Years To Graduation"
COL_COUNT = "Student Headcount"

# entering cohorts old enough to have finished within their window
COHORTS = ["2013-14", "2014-15", "2015-16", "2016-17",
           "2017-18", "2018-19", "2019-20"]

NOT_GRAD_LABELS = ["Not Yet Graduated"]

# on-time: freshmen within 4 years, transfers within 2
ON_TIME = {
    "Freshman Entrant": ["Grad in 1 - 4 Years"],
    "Transfer Entrant": ["Grad in 1 - 2 Years"],
}


def load(path):
    df = pd.read_csv(path)
    df[COL_COUNT] = (
        df[COL_COUNT].astype(str).str.replace(",", "", regex=False).astype(float).astype(int)
    )
    return df[df[COL_YEAR].isin(COHORTS)]


def summarize(df, entry_value):
    sub = df[df[COL_ENTRY] == entry_value]
    total = sub[COL_COUNT].sum()
    grad = sub[~sub[COL_BAND].isin(NOT_GRAD_LABELS)][COL_COUNT].sum()
    grad_rate = round(grad / total, 3) if total else 0

    dist = (
        sub.groupby(COL_BAND)[COL_COUNT].sum()
        .sort_values(ascending=False)
    )
    dist_pct = (dist / total).round(3)

    grad_only = dist.drop(labels=[b for b in NOT_GRAD_LABELS if b in dist.index], errors="ignore")
    modal = grad_only.idxmax() if not grad_only.empty else "n/a"

    on_time_bands = ON_TIME.get(entry_value, [])
    on_time_n = sub[sub[COL_BAND].isin(on_time_bands)][COL_COUNT].sum()
    on_time_share = round(on_time_n / total, 3) if total else 0

    print(f"\n=== {entry_value} (cohorts {COHORTS[0]}-{COHORTS[-1]}) ===")
    print(f"cohort total:        {total}")
    print(f"graduation rate:     {grad_rate:.1%}")
    print(f"modal grad band:     {modal}")
    print(f"on-time share:       {on_time_share:.1%}  (bands: {on_time_bands})")
    print("distribution across bands:")
    for band, pct in dist_pct.items():
        print(f"   {band:<22} {pct:.1%}  (n={dist[band]})")

def export_collapsed(df, path="grad_collapsed.csv"):
    rows = []
    for entry in sorted(df[COL_ENTRY].unique()):
        sub = df[df[COL_ENTRY] == entry]
        total = sub[COL_COUNT].sum()
        on_time_bands = ON_TIME.get(entry, [])

        on_time = sub[sub[COL_BAND].isin(on_time_bands)][COL_COUNT].sum()
        not_yet = sub[sub[COL_BAND].isin(NOT_GRAD_LABELS)][COL_COUNT].sum()
        later = total - on_time - not_yet

        for cat, n in [("On-time", on_time), ("Later", later), ("Not yet graduated", not_yet)]:
            rows.append({
                "Entry Type": entry,
                "Category": cat,
                "Headcount": int(n),
                "Share": round(n / total, 4) if total else 0,
            })
    out = pd.DataFrame(rows)
    out.to_csv(path, index=False)
    print(f"\nwrote {path} ({len(out)} rows)")


def main():
    df = load(FILE_PATH)
    print("Entry types found:", sorted(df[COL_ENTRY].unique()))
    print("Bands found:", sorted(df[COL_BAND].unique()))
    for entry in sorted(df[COL_ENTRY].unique()):
        summarize(df, entry)
    export_collapsed(df)


if __name__ == "__main__":
    main()