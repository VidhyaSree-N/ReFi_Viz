import { Controller } from "@hotwired/stimulus"
import * as annotation from "chartjs-plugin-annotation"
Chart.register(annotation);


export default class extends Controller {
  static targets = ["yearlyCanvas", "monthlyCanvas","savingsCanvas"]
  static values = {
    originalPayment: Number,
    newPayment: Number,
    originalTotal: Number,
    newTotal: Number,
    totalSavings: Number,
    term: Number
  }

  connect() {
    this.buildYearlyChart()
    this.buildSavingsChart()
  }

  buildYearlyChart(gap = true) {
    if (this.yearlyChart) {
      this.yearlyChart.destroy()
    }

    const isMerged = !gap

    const annotationOptions = isMerged
  ? {
      annotation: {
        annotations: {
          savingsLabel: {
            type: 'label',
            xValue: 1, // index of "Refinanced" bar
            yValue: (ctx) => {
              const value = ctx.chart.data.datasets[0].data[1];
              return value + value * 0.05; // dynamic adjustment
            },
            content: [`💰 Savings: $${this.totalSavingsValue}`],
            font: {
              size: 14,
              weight: 'bold',
            },
            color: '#16a34a',
            textAlign: 'center',
            position: {
              x: 'center',  // horizontally center over the bar
              y: 'start',   // put slightly above the bar
            },
            drawTime: 'afterDatasetsDraw',
            padding: 0,
          }
        }
      }
    }
  : {}


    this.yearlyChart = new Chart(this.yearlyCanvasTarget, {
      type: 'bar',
      data: {
        labels: ["Original Total", "Refinanced Total"],
        datasets: [{
          label: "Total Cost ($)",
          data: [
            this.originalTotalValue,
            this.newTotalValue
          ],
          backgroundColor: ['#dc2626', '#16a34a'],
          borderRadius: 8,
          barPercentage: gap ? 0.8 : 1.0,
          categoryPercentage: gap ? 0.8 : 1.0,
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: "easeOutQuart"
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `$${context.parsed.y.toFixed(2)}`
              }
            }
          },
          ...annotationOptions // Apply merged plugin config here
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value}`
            }
          }
        }
      }
    })
  }

  

  animateAndMergeYearlyChart() {
    // Clear chart data to animate in
    this.yearlyChart.data.datasets[0].data = [0, 0];
    this.yearlyChart.update();

    setTimeout(() => {
      // Rebuild chart with merged bars
      this.buildYearlyChart(false); // false = no gap = bars touch
    }, 300);
  }


  buildSavingsChart() {
    const term = this.termValue;
    const monthlySavings = this.originalPaymentValue - this.newPaymentValue;
    const labels = Array.from({ length: term }, (_, i) => `Month ${i + 1}`);
    const savingsData = labels.map((_, i) => (monthlySavings * (i + 1)).toFixed(2));
  
    new Chart(this.savingsCanvasTarget, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Cumulative Savings ($)",
          data: savingsData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `$${ctx.parsed.y}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value}`
            }
          }
        }
      }
    });
  }
  
}


