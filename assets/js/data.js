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
    metrics: ["Pell Grant recipients", "Housing insecure", "Working 20+ hrs/wk"],
    freshman: [35, 11, 12],
    transfer: [55, 27, 32],
    note: "Pell Grant: UC system-wide 2021-22, UC InfoCenter. Housing insecurity: UC Basic Needs survey. Employment: UCUES survey, UC Berkeley."
  }
};
