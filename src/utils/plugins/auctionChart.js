import { enUS } from "date-fns/locale";
import Color from "color";
import Chart from "./chart";

const data = {
    labels: [],
    datasets: [
        {
            label: "Price",
            data: [],
            borderColor: "rgb(200, 200, 200)",
            backgroundColor: "rgb(200, 200, 200)",
            yAxisID: "y",
            trendlineLinear: {
                colorMin: "rgb(200, 200, 200)",
                lineStyle: "dotted",
                width: 2,
            },
        },
        {
            label: "Count",
            data: [],
            borderColor: "rgb(50, 50, 50)",
            backgroundColor: "rgb(50, 50, 50)",
            yAxisID: "y1",
            trendlineLinear: {
                colorMin: "rgb(50, 50, 50)",
                lineStyle: "dotted",
                width: 2,
            },
        },
    ],
};

const config = {
    type: "line",
    data,
    options: {
        responsive: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                labels: {
                    // color: 'rgb(0,0,0)',
                    generateLabels(chart) {
                        const { data } = chart;
                        return Array.isArray(data.datasets)
                            ? data.datasets.map(
                                  (dataset, i) => ({
                                      text: `${dataset.label} (Min: ${Math.min
                                          .apply(
                                              null,
                                              dataset.data.map((d) => d.y)
                                          )
                                          .toLocaleString()} - Max: ${Math.max
                                          .apply(
                                              null,
                                              dataset.data.map((d) => d.y)
                                          )
                                          .toLocaleString()})`,
                                      fillStyle: !Array.isArray(
                                          dataset.backgroundColor
                                      )
                                          ? dataset.backgroundColor
                                          : dataset.backgroundColor[0],
                                      hidden: !chart.isDatasetVisible(i),
                                      lineCap: dataset.borderCapStyle,
                                      lineDash: dataset.borderDash,
                                      lineDashOffset: dataset.borderDashOffset,
                                      lineJoin: dataset.borderJoinStyle,
                                      lineWidth: dataset.borderWidth,
                                      strokeStyle: dataset.borderColor,
                                      pointStyle: dataset.pointStyle,
                                      fontColor: "rgb(0,0,0)",

                                      // Below is extra data used for toggling the datasets
                                      datasetIndex: i,
                                  }),
                                  this
                              )
                            : [];
                    },
                },
            },
        },
        scales: {
            xAxes: {
                type: "time",
                time: {
                    minUnit: "day",
                },
                adapters: {
                    date: {
                        locale: enUS,
                    },
                },
                grid: {
                    borderColor: "rgb(0,0,0)",
                    color: "rgb(0,0,0)",
                },
                ticks: {
                    color: "rgb(0,0,0)",
                },
            },
            y: {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                    borderColor: "rgb(0,0,0)",
                    color: "rgb(0,0,0)",
                },
                ticks: {
                    color: "rgb(0,0,0)",
                    callback(value) {
                        const lookup = [
                            { value: 1, symbol: "" },
                            { value: 1e3, symbol: "k" },
                            { value: 1e6, symbol: "M" },
                            { value: 1e9, symbol: "G" },
                            { value: 1e12, symbol: "T" },
                            { value: 1e15, symbol: "P" },
                            { value: 1e18, symbol: "E" },
                        ];
                        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                        const item = lookup
                            .slice()
                            .reverse()
                            .find((f) => value >= f.value);
                        return item
                            ? (value / item.value)
                                  .toFixed(1)
                                  .replace(rx, "$1") + item.symbol
                            : "0";
                    },
                },
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                    borderColor: "rgb(0,0,0)",
                    color: "rgb(0,0,0)",
                },
                ticks: {
                    color: "rgb(0,0,0)",
                },
            },
        },
    },
};

const colors = {
    White: {
        background: Color("rgb(243 244 246)"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
    Green: {
        background: Color("rgb(34 197 94)"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
    Blue: {
        background: Color("rgb(168 85 247)"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
    Purple: {
        background: Color("rgb(59 130 246)"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
    Legendary: {
        background: Color("rgb(234 179 8)"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
    Mythic: {
        background: Color("cyan"),
        text: "rgb(0,0,0)",
        datasets: [
            Color("blue").darken(0.5).rgb().string(),
            Color("green").darken(0.5).rgb().string(),
        ],
    },
};

export default (domId, datasets, colorIdent) => {
    const curConfig = { ...config };
    if (colors[colorIdent]) {
        curConfig.data.datasets[0].borderColor = colors[colorIdent].datasets[0];
        curConfig.data.datasets[0].backgroundColor =
            colors[colorIdent].datasets[0];
        curConfig.data.datasets[0].trendlineLinear.colorMin =
            colors[colorIdent].datasets[0];
        curConfig.options.scales.y.ticks.color = colors[colorIdent].datasets[0];
        curConfig.data.datasets[1].borderColor = colors[colorIdent].datasets[1];
        curConfig.data.datasets[1].backgroundColor =
            colors[colorIdent].datasets[1];
        curConfig.data.datasets[1].trendlineLinear.colorMin =
            colors[colorIdent].datasets[1];
        curConfig.options.scales.y1.ticks.color =
            colors[colorIdent].datasets[1];
    }
    curConfig.data.datasets[0].data = datasets.map((auction) => ({
        x: auction.insertedTimestamp * 1000,
        y: auction.avgLow,
    }));
    curConfig.data.datasets[1].data = datasets.map((auction) => ({
        x: auction.insertedTimestamp * 1000,
        y: auction.avgCount,
    }));
    return new Chart(document.getElementById(domId), curConfig);
};
