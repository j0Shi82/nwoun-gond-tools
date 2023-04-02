import {
    Chart,
    // ArcElement,
    LineElement,
    // BarElement,
    PointElement,
    // BarController,
    // BubbleController,
    // DoughnutController,
    LineController,
    // PieController,
    // PolarAreaController,
    // RadarController,
    // ScatterController,
    // CategoryScale,
    LinearScale,
    // LogarithmicScale,
    // RadialLinearScale,
    TimeScale,
    // TimeSeriesScale,
    // Decimation,
    // Filler,
    Legend,
    // Title,
    Tooltip,
    // SubTitle,
} from "chart.js";
import "chartjs-adapter-date-fns";
import chartTrendline from "chartjs-plugin-trendline";

Chart.register(
    // ArcElement,
    LineElement,
    // BarElement,
    PointElement,
    // BarController,
    // BubbleController,
    // DoughnutController,
    LineController,
    // PieController,
    // PolarAreaController,
    // RadarController,
    // ScatterController,
    // CategoryScale,
    LinearScale,
    // LogarithmicScale,
    // RadialLinearScale,
    TimeScale,
    // TimeSeriesScale,
    // Decimation,
    // Filler,
    Legend,
    // Title,
    Tooltip
    // SubTitle,
);
Chart.register(chartTrendline);

export default Chart;
