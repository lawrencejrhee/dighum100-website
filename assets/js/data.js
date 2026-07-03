/* =========================================================================
   data.js — Data for Chart.js visualizations
   -------------------------------------------------------------------------
   Charts 1–4 (graduation, GPA, major share, admit rate) now use Tableau
   embeds in analysis.html.  This file feeds the remaining Chart.js chart.
   The charts (assets/js/charts.js) read from window.DH_DATA below.
   ========================================================================= */

window.DH_DATA = {

  /* ---- Financial pressure by entry type ---------------------------------
     Compare key financial-aid indicators between the two pathways.       */
  financialPressure: {
    metrics: ["Pell Grant recipients", "First-generation students"],
    freshman: [35, 26],
    transfer: [45, 43],
    note: "Pell Grant: UC system-wide 2021-22, UC InfoCenter. First-generation: UC Berkeley admissions student profile."
  }
};
