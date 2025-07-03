import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => (
  <div className="pie-chart-container">
    <Pie
      data={data}
      options={{
        plugins: {
          legend: { position: 'right' },
          tooltip: { enabled: true }
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  </div>
);

export default PieChart;
