import { enUS } from 'date-fns/locale';
import Chart from './chart';

const data = {
  labels: [],
  datasets: [
    {
      label: 'Price',
      data: [],
      borderColor: 'rgb(200, 200, 200)',
      backgroundColor: 'rgb(200, 200, 200)',
      yAxisID: 'y',
      trendlineLinear: {
        colorMin: "rgb(200, 200, 200)",
        lineStyle: "dotted",
        width: 2,
      }
    },
    {
      label: 'Count',
      data: [],
      borderColor: 'rgb(50, 50, 50)',
      backgroundColor: 'rgb(50, 50, 50)',
      yAxisID: 'y1',
      trendlineLinear: {
        colorMin: "rgb(50, 50, 50)",
        lineStyle: "dotted",
        width: 2,
      }
    },
  ],
};

const config = {
  type: 'line',
  data,
  options: {
    responsive: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        labels: {
          color: 'rgb(0,0,0)',
        },
      },
    },
    scales: {
      xAxes: {
        type: 'time',
        time: {
          minUnit: 'day',
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        grid: {
          borderColor: 'rgb(0,0,0)',
          color: 'rgb(0,0,0)',
        },
        ticks: {
          color: 'rgb(0,0,0)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          borderColor: 'rgb(0,0,0)',
          color: 'rgb(0,0,0)',
        },
        ticks: {
          color: 'rgb(0,0,0)',
          callback(value) {
            const lookup = [
              { value: 1, symbol: '' },
              { value: 1e3, symbol: 'k' },
              { value: 1e6, symbol: 'M' },
              { value: 1e9, symbol: 'G' },
              { value: 1e12, symbol: 'T' },
              { value: 1e15, symbol: 'P' },
              { value: 1e18, symbol: 'E' },
            ];
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            const item = lookup.slice().reverse().find((f) => value >= f.value);
            return item ? (value / item.value).toFixed(1).replace(rx, '$1') + item.symbol : '0';
          },
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
          borderColor: 'rgb(0,0,0)',
          color: 'rgb(0,0,0)',
        },
        ticks: {
          color: 'rgb(0,0,0)',
        },
      },
    },
  },
};

export default (domId, datasets) => {
  const curConfig = { ...config };
  curConfig.data.datasets[0].data = datasets.map((auction) => ({ x: auction.InsertedTimestamp * 1000, y: auction.AvgLow }));
  curConfig.data.datasets[1].data = datasets.map((auction) => ({ x: auction.InsertedTimestamp * 1000, y: auction.AvgCount }));
  return new Chart(document.getElementById(domId), curConfig);
};
