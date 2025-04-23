import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["canvas"]
  static values = {
    monthlySavings: Number,
    term: Number
  }

  connect() {
    this.currentMonth = 1
    this.direction = 1
    const ctx = this.canvasTarget.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, this.canvasTarget.width, 0) // Horizontal bar
    gradient.addColorStop(0, '#bbf7d0')  // 💡 Light green
    gradient.addColorStop(1, '#166534') // 🌿 Dark green
    

    this.chart = new Chart(this.canvasTarget, {
      type: 'bar',
      data: {
        labels: ["Cumulative Savings"],
        datasets: [{
          data: [0],
          backgroundColor: gradient,
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 1.0,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context => `$${context.parsed.x.toFixed(2)}`
            }
          },
          title: {
            display: true,
            text: "", // dynamic label here
            padding: {
              top: 10,
              bottom: 20
            },
            font: {
              size: 14,
              weight: "bold"
            },
            color: "#16a34a"
          }
        },
        scales: {
            x: {
              beginAtZero: true,
              ticks: {
                callback: value => `$${value}`
              }
            },
            y: {
              title: {
                display: false // 🚫 Hides the axis label
              },
              ticks: {
                display: false // 🚫 Hides tick values (optional)
              },
              grid: {
                drawTicks: false,
                drawBorder: false
              }
            }
          }
      }
    })

    this.loopAnimation()
  }

  loopAnimation() {
    const totalMonths = this.termValue
    const monthlySavings = this.monthlySavingsValue

    this.timer = setInterval(() => {
      const cumulative = monthlySavings * this.currentMonth
      this.chart.data.datasets[0].data[0] = cumulative

      // 🟢 Update the title with month + savings info
      this.chart.options.plugins.title.text = `Month ${this.currentMonth} → $${cumulative.toFixed(2)} Saved`

      this.chart.update()

      this.currentMonth++

      if (this.currentMonth > totalMonths) {
        this.currentMonth = 1
      }
      
    }, 1000)
  }

  disconnect() {
    clearInterval(this.timer)
  }
}
