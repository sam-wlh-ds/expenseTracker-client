// PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({currBal, totInc, totExp}) => {
  const status = (totExp-totInc>0)? `Losing: ${totExp-totInc}`:`Saving: ${totInc-totExp}`;
  const data = {
    labels: ['Total Expense', 'Current Balance', 'Total Income'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [totExp, currBal, totInc],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="card mb-3 horizontal-card-style">
        <div className="row g-0">
          <div className="col-md-4 container">
            <Pie data={data} className="img-fluid rounded-start p-2"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">Review</h3>
              <h4 className={(totExp-totInc>=0)? "text-danger":"text-success"}>{status}</h4>
              {(totExp-totInc>=0)? <h4 className='text-warning'>Can Survive: {(totExp-totInc>0)?Math.floor(currBal/(totExp-totInc)):0} Months</h4>:<h4>Good Job</h4>}
              {(totExp-totInc>=0)?
                <p className="card-text">Take a closer look at your spending categories and identify areas where you can cut back. Prioritize essential expenses and consider reducing discretionary spending.</p>
               :<p className='card-text'>Consider allocating the surplus towards savings or investment accounts. Building an emergency fund and investing for the future can help secure your financial stability.</p>
              }
              <p className="card-text"><small className="text-body-secondary">Auto Generated Review</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
