import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const TimeSeriesChart: React.FC<{ data: any[] }> = ({ data }) => {
  const chartData: ApexOptions = {
    series: [{
      name: 'Visitors',
      data: data.map(d => [d.date, d.visitors]),
    }],
    chart: { type: 'line' as 'line', zoom: { enabled: true } },
    xaxis: { type: 'datetime' },
    yaxis: { title: { text: 'Number of Visitors' } }
  };

  return (
    <div className="p-10 border-black border-2 w-[90%] mx-auto">
        <Chart options={chartData} series={chartData.series} type="line" height={350} />;
    </div> 
  )
};

export default TimeSeriesChart;
