// LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const LineChart = ({label,info}) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Cost',
        data: info,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Transactions Data</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
