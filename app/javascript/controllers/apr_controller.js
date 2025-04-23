import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "checkbox", "slider", "score", "estimate", "sliderContainer"]

  connect() {
    this.sliderContainerTarget.classList.add("hidden")
  }

  toggle() {
    const show = this.checkboxTarget.checked
    this.sliderContainerTarget.classList.toggle("hidden", !show)

    if (show) {
      this.update()
    }
  }

  update() {
    const credit = parseInt(this.sliderTarget.value)
    this.scoreTarget.textContent = credit

    let apr
    if (credit >= 760) {
      apr = 5.4
    } else if (credit >= 720) {
      apr = 5.8
    } else if (credit >= 680) {
      apr = 6.2
    } else if (credit >= 640) {
      apr = 6.6
    } else {
      apr = 7.2
    }

    this.estimateTarget.textContent = `${apr.toFixed(1)}%`
    this.inputTarget.value = apr.toFixed(2)
  }
}
