import _ from 'lodash';


export function getChartData(coinData) {
    return coinData.kline?.map(({ open, time }) => {
      let date = new Date(Number(time)).getTime();
  
      if (isNaN(date)) {
        date = new Date(time).getTime();
      }
  
      return {
        y: Number(open),
        x: date,
      };
    });
  }