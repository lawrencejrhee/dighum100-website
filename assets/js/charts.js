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
  var BLUE = "#002676", GOLD = "#fdb515", BLUE_SOFT = "rgba(0,38,118,.12)";
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

  // 1) Cumulative graduation rate — LINE chart (a second, distinct type) --
  if (D.gradRates) {
    make("chart-gradrate", {
      type: "line",
      data: {
        labels: D.gradRates.checkpoints,
        datasets: [
          { label: "Freshman admits", data: D.gradRates.freshman,
            borderColor: BLUE, backgroundColor: BLUE, borderWidth: 3, tension: .15,
            pointRadius: 6, pointHoverRadius: 8 },
          { label: "Transfer admits", data: D.gradRates.transfer,
            borderColor: GOLD, backgroundColor: GOLD, borderWidth: 3, tension: .15,
            pointRadius: 6, pointHoverRadius: 8 }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + "%"; } },
               title: { display: true, text: "Cumulative graduation rate" } }
        },
        plugins: {
          tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": " + c.parsed.y + "%"; } } }
        }
      }
    });
  }

  // 2) Time-to-degree — bar with reference markers ----------------------
  if (D.timeToDegree) {
    make("chart-time", {
      type: "bar",
      data: {
        labels: D.timeToDegree.groups,
        datasets: [
          { label: "Average years to degree", data: D.timeToDegree.average, backgroundColor: BLUE, borderRadius: 6 },
          { label: "“Standard” timeframe", data: D.timeToDegree.standard,
            backgroundColor: "rgba(253,181,21,.55)", borderRadius: 6 }
        ]
      },
      options: {
        scales: { y: { beginAtZero: true, title: { display: true, text: "Years" } } },
        plugins: {
          tooltip: { callbacks: { label: function (c) { return c.dataset.label + ": " + c.parsed.y + " yrs"; } } }
        }
      }
    });
  }

  // 3) Average graduating GPA — bar, HONEST axis from 0 ------------------
  if (D.gpa) {
    make("chart-gpa", {
      type: "bar",
      data: {
        labels: D.gpa.groups,
        datasets: [{ label: "Average graduating GPA", data: D.gpa.gpa,
                     backgroundColor: [BLUE, GOLD], borderRadius: 6 }]
      },
      options: {
        scales: { y: { beginAtZero: true, max: 4.0, title: { display: true, text: "GPA (0–4.0 scale)" } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4) Transfer share by major — horizontal bar -------------------------
  if (D.transferShareByMajor) {
    make("chart-major", {
      type: "bar",
      data: {
        labels: D.transferShareByMajor.majors,
        datasets: [{ label: "% of degree recipients who entered as transfers",
                     data: D.transferShareByMajor.sharePct, backgroundColor: BLUE, borderRadius: 6 }]
      },
      options: {
        indexAxis: "y",
        scales: { x: { beginAtZero: true, max: 100, ticks: { callback: function (v) { return v + "%"; } } } },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) { return c.parsed.x + "% transfer-origin"; } } }
        }
      }
    });
  }
  // 5) Financial pressure — grouped bar ----------------------------------
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
