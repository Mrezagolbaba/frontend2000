$(document).ready(function () {
  let options = {
    series: [ 55, 41, 17],
    labels: [
      'تتر  <span>124$</span>',
      'لیر <span>1243,45TL</span>',
      'ریال  <span>1,254,365Toman</span>',
],
    colors: ['#FFA451', '#5181FF', '#51FF77'],
    chart: {
      type: 'donut',
      width: 425,
    },
    responsive: [{
      breakpoint: 575,
      options: {
        chart: {
          width: 300,
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + "%"
      },
      dropShadow: {}
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          size: '75%'
        },
        expandOnClick: false,
      }
    }
  };

  function renderChartLegends() {
    let el = ``;
    let colors = options.colors;

    options.series.forEach((item, i) => {
      el += `
        <li class="wallet-chart-legend">
          <span style="background-color: ` + colors[i] + `"></span>
          %` + item + `
        </li>
      `;
    });

    $('.wallet-chart-legends').append(el);
  }

  var chart = new ApexCharts(document.querySelector("#walletChart"), options);
  chart.render();
  renderChartLegends();
});
