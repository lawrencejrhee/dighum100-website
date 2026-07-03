/* =========================================================================
   data.js  —  ★ THE ONLY FILE YOUR GROUP NEEDS TO EDIT TO INSERT REAL DATA ★
   -------------------------------------------------------------------------
   Every number below is an ILLUSTRATIVE PLACEHOLDER so the charts render.
   Replace each value with the figures you computed in Python/pandas from the
   Berkeley Data Digest + UC InfoCenter tables, then delete the draft banners
   in analysis.html.  Do NOT submit with these placeholder numbers.

   How to edit: change only the numbers inside the arrays. Labels can change
   too. The charts (assets/js/charts.js) read from window.DH_DATA below.
   ========================================================================= */

window.DH_DATA = {

  /* ---- 1) Graduation rate by entry type --------------------------------
     Berkeley reports grad rates at fixed checkpoints. Transfers are usually
     measured on a 2yr/4yr clock (they enter as juniors); freshmen on 4yr/6yr.
     Replace with your computed rates (percentages, 0–100).                */
  gradRates: {
    checkpoints: ["“on-time” (2yr transfer / 4yr freshman)", "Extended (4yr transfer / 6yr freshman)"],
    freshman:  [76, 94],   // ← REPLACE with real freshman grad-rate %
    transfer:  [62, 90],   // ← REPLACE with real transfer grad-rate %
    note: "Placeholder values. Replace with Group 4’s computed rates from the Berkeley Data Digest ‘Graduation Rates & Retention’ table."
  },

  /* ---- 2) Time-to-degree -----------------------------------------------
     Average years to degree vs. the institution’s “standard” clock.
     Transfers: standard = 2 years. Freshmen: standard = 4 years.          */
  timeToDegree: {
    groups: ["Freshman admits", "Transfer admits"],
    average:  [4.1, 2.5],   // ← REPLACE: real average years to degree
    standard: [4.0, 2.0],   // reference "standard" clock for each pathway
    note: "Placeholder values. Time-to-degree is NOT directly comparable across pathways; each is shown against its own ‘standard’ timeframe."
  },

  /* ---- 3) Average graduating GPA by entry type -------------------------
     NOTE ON ETHICS: the y-axis is deliberately drawn from 0 (not zoomed to
     3.0–4.0). A truncated axis would exaggerate a tiny gap — exactly the
     kind of choice Hepworth & Church warn against. Keep it honest.        */
  gpa: {
    groups: ["Freshman admits", "Transfer admits"],
    gpa: [3.55, 3.42],      // ← REPLACE with real average graduating GPA
    note: "Placeholder values. Axis intentionally starts at 0 to avoid visually exaggerating a small difference (visualization ethics)."
  },

  /* ---- 4) Transfer share by major --------------------------------------
     For selected majors, what % of degree recipients entered as transfers?
     Add/remove rows freely. Sorted largest→smallest looks best.           */
  transferShareByMajor: {
    majors: ["Sociology", "Social Welfare", "Economics", "Political Science",
             "Molecular & Cell Biology", "Computer Science", "Chemistry"],
    sharePct: [58, 55, 41, 38, 27, 19, 16],  // ← REPLACE with real % transfer
    note: "Placeholder values. Replace with transfer share by major computed from the ‘Degree Recipients by Major’ table."
  },

  /* ---- 5) Financial pressure by entry type ------------------------------
     Compare key financial-aid indicators between the two pathways.       */
  financialPressure: {
    metrics: ["Pell Grant recipients", "First-generation students"],
    freshman: [35, 26],
    transfer: [45, 43],
    note: "Pell Grant: UC system-wide 2021-22, UC InfoCenter. First-generation: UC Berkeley admissions student profile."
  },

  /* ---- 6) Regional / map embed -----------------------------------------
     Interactive map is embedded from Tableau Public (Cesar Alesi Perez,
     cited in the bibliography). If the embed URL changes, update it in
     analysis.html where the <iframe> lives.                               */
  mapNote: "Embedded Tableau Public viz by Cesar Alesi Perez (see Bibliography)."
};
