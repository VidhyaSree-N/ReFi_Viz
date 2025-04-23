// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)
import ChartController from "./chart_controller"
application.register("chart", ChartController)
import * as annotation from "chartjs-plugin-annotation"
Chart.register(annotation)
import ThermometerChartController from "./thermometer_chart_controller"
application.register("thermometer-chart", ThermometerChartController)
