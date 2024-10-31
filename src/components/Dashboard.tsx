// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import TimeSeriesChart from './TimeSeriesChart';
import ColumnChart from './ColumnChart';
import SparklineChart from './SparklineChart';
import { loadData } from '../utils/dataLoader';

type BookingData = {
  year: number;
  month: string;
  day: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<BookingData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    loadData().then((loadedData) => setData(loadedData));
  }, []);

  const filteredData = data.filter((record) => {
    const recordDate = new Date(record.year, new Date(record.month + ' 1, 2000').getMonth(), record.day);

    if (startDate && endDate) {
      return recordDate >= startDate && recordDate <= endDate;
    }
    return true;
  });

  // Transform filtered data for each chart's requirements

  // Time Series Data: Total number of visitors per day
  const timeSeriesData = filteredData.reduce((acc, record) => {
    const date = `${record.year}-${record.month}-${record.day}`;
    const totalVisitors = record.adults + record.children + record.babies;
    if (acc[date]) {
      acc[date] += totalVisitors;
    } else {
      acc[date] = totalVisitors;
    }
    return acc;
  }, {} as Record<string, number>);

  const timeSeriesChartData = Object.entries(timeSeriesData).map(([date, visitors]) => ({
    date,
    visitors,
  }));

  // Column Chart Data: Number of visitors per country
  const countryData = filteredData.reduce((acc, record) => {
    const totalVisitors = record.adults + record.children + record.babies;
    if (acc[record.country]) {
      acc[record.country] += totalVisitors;
    } else {
      acc[record.country] = totalVisitors;
    }
    return acc;
  }, {} as Record<string, number>);

  const columnChartData = Object.entries(countryData).map(([country, count]) => ({
    country,
    count,
  }));

  // Sparkline Data: Total number of adult and children visitors
  const sparklineDataAdults = filteredData.map((record) => ({
    date: `${record.year}-${record.month}-${record.day}`,
    count: record.adults,
  }));

  const sparklineDataChildren = filteredData.map((record) => ({
    date: `${record.year}-${record.month}-${record.day}`,
    count: record.children,
  }));

  return (
    <>
        <DateRangePicker
            //@ts-ignore
            startDate={startDate}
            //@ts-ignore
            endDate={endDate}
            onChange={([start, end]) => {
            setStartDate(start);
            setEndDate(end);
            }}
        />
        <div className='grid grid-cols-2 align-middle border-solid justify-evenly'>
            <TimeSeriesChart data={timeSeriesChartData} />
            <ColumnChart data={columnChartData} />
            <SparklineChart data={sparklineDataAdults} label="Adults" />
            <SparklineChart data={sparklineDataChildren} label="Children" />
        </div>
    </>
  );
};

export default Dashboard;
