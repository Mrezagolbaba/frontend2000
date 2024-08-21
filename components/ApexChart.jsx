import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function ApexChart({ strokeColor, data }) {
  const options = {
    height: 70,
    chart: {
      type: 'line',
      height: 70,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      width: '100%',
      height: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: [],
    },
    title: {
      text: ' ',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      show: false,
      type: 'datetime',
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },

    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={{
            ...options,
            stroke: {
              ...options.stroke,
              colors: [strokeColor],
            },
          }}
          series={[{ data: data ?? [] }]}
          type="line"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ApexChart;
