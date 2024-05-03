import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(CategoryScale);
function Bars({ labels, dataBar, title, titleHover }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: dataBar,
        backgroundColor: ["#22c55e20"],
        borderColor: ["#22c55e"],
        borderWidth: 1,
        titleHover: titleHover,
        barThickness: 50,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom"
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const priceHover =
              tooltipItem.dataset.data[tooltipItem.dataIndex];
            if (titleHover) {
              const labelHover =
              tooltipItem.dataset.titleHover[tooltipItem.dataIndex];
              return `${labelHover} : ${priceHover.toLocaleString("vi-vn")} VNĐ`;
            }else{
              return `${priceHover.toLocaleString("vi-vn")} VNĐ`
            }
          },
        },
      },
    },
  };

  return (
    <div className="w-[400px] sm:w-[600px] lg:w-[700px] xl:w-[1000px] mx-10 my-4 overflow-y-auto">
      <div className="w-[800px] my-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Bars;
