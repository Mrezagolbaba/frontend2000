import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
function ApexChart({ data }) {
  return (
    <div style={{ width: "135px", height: "45px" }}>
      <Line
        data={{
          labels: data?.kline?.map((item) =>
            new Date(parseInt(item.time)).toLocaleTimeString(),
          ),
          datasets: [
            {
              data: data?.kline?.map((item) => parseFloat(item.close)),
              borderColor:
                Number(data?.ohlc.dailyChangePercentage) >= 0
                  ? "rgb(74,164,41)"
                  : "rgb(179, 38, 30)",
              tension: 0.5,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: { display: false },
              grid: { display: false, drawTicks: false },
              border: { display: false },
            },
            y: {
              ticks: { display: false },
              grid: { display: false, drawTicks: false },
              border: { display: false },
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        }}
      />
    </div>
  );
}

export default ApexChart;
