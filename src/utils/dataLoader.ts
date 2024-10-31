import { csvParse } from 'd3-dsv';

export const loadData = async () => {
  const response = await fetch('/hotel_bookings_1000.csv');
  const csvData = await response.text();
  return csvParse(csvData).map(d => ({
    year: Number(d.arrival_date_year),
    month: d.arrival_date_month,
    day: Number(d.arrival_date_day_of_month),
    adults: Number(d.adults),
    children: Number(d.children),
    babies: Number(d.babies),
    country: d.country,
  }));
};
