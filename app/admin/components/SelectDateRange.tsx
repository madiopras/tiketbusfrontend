import { id } from 'date-fns/locale/id';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface DateRangePickerProps {
  idate?: string;
  label: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  required?: boolean; // Menambahkan properti required (opsional)
  disabled?: boolean; // Menambahkan properti disabled (opsional)
  showError?: boolean; // Menambahkan properti showError (opsional)
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  idate, 
  label, 
  onStartDateChange, 
  onEndDateChange,
  required = false, 
  disabled = false,
  showError = false,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={idate}>{label}</label>
      <div className="flex gap-4"> 
        <DatePicker
          locale={id}
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={startDate}
          onChange={(date: Date | null) => {
            setStartDate(date);
            onStartDateChange(date); 
          }}
          showTimeSelect
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={`input input-sm input-bordered w-60 max-w-x ${showError ? 'input-error' : ''}`}
          required={required}
          disabled={disabled}
          isClearable
          closeOnScroll={true}
          placeholderText="Tanggal Mulai"
        />
        <DatePicker
          locale={id}
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={endDate}
          onChange={(date: Date | null) => {
            setEndDate(date);
            onEndDateChange(date); 
          }}
          showTimeSelect
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className={`input input-sm input-bordered w-60 max-w-x ${showError ? 'input-error' : ''}`}
          required={required}
          disabled={disabled}
          isClearable
          closeOnScroll={true}
          placeholderText="Tanggal Selesai"
        />
      </div>
      <div className="label">
        {showError && (
          <span className="label-text-alt text-error">Field ini wajib diisi</span>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;