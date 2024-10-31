import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ColumnChart: React.FC<{ data: any[] }> = ({ data }) => {
  const chartData: ApexOptions = {
    series: [{
      name: 'Visitors',
      data: data.map(d => d.count)
    }],
    chart: { type: 'bar' as 'bar' },
    xaxis: { categories: data.map(d => d.country) },
    yaxis: { title: { text: 'Number of Visitors' } }
  };

  return (
    <div className="p-10 border-black border-2 w-[90%] mx-auto">
        <Chart options={chartData} series={chartData.series} type="bar" height={350} />;
    </div>
  )
};

export default ColumnChart;
