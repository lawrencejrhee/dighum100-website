/* =========================================================================
   charts.js — builds the interactive charts with Chart.js (v4, via CDN).
   Reads numbers from window.DH_DATA (assets/js/data.js). You should not need
   to edit this file to change data — edit data.js instead.
   ========================================================================= */
(function () {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js failed to load (check your internet connection / CDN).");
    return;
  }
  var D = window.DH_DATA || {};

  // Shared theme ---------------------------------------------------------
  var BLUE = "#002676", GOLD = "#fdb515";
  Chart.defaults.font.family =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.color = "#45474f";
  Chart.defaults.plugins.legend.labels.boxWidth = 14;

  var animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function make(id, config) {
    var el = document.getElementById(id);
    if (!el) return;
    config.options = config.options || {};
    config.options.responsive = true;
    config.options.maintainAspectRatio = false;
    config.options.animation = animate ? config.options.animation : false;
    new Chart(el, config);
  }

  // Financial pressure — grouped bar --------------------------------------
  if (D.financialPressure) {
    var fp = D.financialPressure;
    make("chart-financial", {
      type: "bar",
      data: {
        labels: fp.metrics,
        datasets: [
          { label: "Freshman admits", data: fp.freshman, backgroundColor: BLUE, borderRadius: 6 },
          { label: "Transfer admits", data: fp.transfer, backgroundColor: GOLD, borderRadius: 6 }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + "%"; } },
               title: { display: true, text: "Share of students" } }
        },
        plugins: {
          tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": " + c.parsed.y + "%"; } } }
        }
      }
    });
  }
})();
