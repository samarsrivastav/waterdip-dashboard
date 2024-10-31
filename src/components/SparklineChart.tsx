// src/components/SparklineChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface SparklineChartProps {
  data: { date: string; count: number }[];
  label: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, label }) => {
  const options = {
    chart: {
      type: 'area' as 'area', // Explicitly cast type
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    yaxis: {
      min: 0,
    },
    colors: ['#40a0fc'],
    title: {
      text: label,
      offsetX: 0,
      style: {
        fontSize: '14px',
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  const series = [
    {
      name: label,
      data: data.map(item => item.count),
    },
  ];

  return (
    <div className='w-[90%] mx-auto my-3 border-black border-2'>
      <Chart options={options} series={series} type="area" height={160} />
    </div>
  );
};

export default SparklineChart;
