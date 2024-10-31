import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: Date ;
  endDate: Date ;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onChange }) => (
    
  <DatePicker
    className='ml-80 border rounded-2xl p-2 text-center font-bold my-2'
    selectsRange
    startDate={startDate}
    endDate={endDate}
    onChange={onChange}
    placeholderText="Select date range"
  />
);

export default DateRangePicker;
