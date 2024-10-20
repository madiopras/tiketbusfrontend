import { now } from "moment-timezone";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



interface DateRangePickerProps {
  idate?: string;
  labelstart: string;
  labelend: string;
  startDate?: Date | null; // Menambahkan properti startDate
  endDate?: Date | null;   // Menambahkan properti endDate
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  required?: boolean; // Menambahkan properti required (opsional)
  disabled?: boolean; // Menambahkan properti disabled (opsional)
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  idate,
  labelstart,
  labelend,
  onStartDateChange,
  onEndDateChange,
  startDate: initialStartDate = null, // Ubah nama prop menjadi initialStartDate
  endDate: initialEndDate = null,   // Ubah nama prop menjadi initialEndDate
  required = false,
  disabled = false,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Inisialisasi state internal dengan props eksternal saat komponen dimuat atau saat props berubah
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  useEffect(() => {
    // Memperbarui status error berdasarkan startDate dan endDate
    setShowError(required && (!startDate || !endDate));
  }, [startDate, endDate, required]);

  const handleDateChange = (date: Date | null, isStartDate: boolean) => {
    if (isStartDate) {
      setStartDate(date);
      onStartDateChange?.(date); // Optional chaining

      if (date === null) {
        setEndDate(null);
        onEndDateChange?.(null); // Optional chaining
      }
    } else {
      setEndDate(date);
      onEndDateChange?.(date); // Optional chaining
    }
  };

  return (
    <>
      <div className="form-control">
      <label className="label text-sm" htmlFor={idate}>
        {labelstart}
      </label>
        <DatePicker
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={startDate}
          onChange={(date) => handleDateChange(date, true)}
          withPortal
          showTimeSelect
          selectsStart
          startDate={startDate || undefined} // Menggunakan undefined jika startDate adalah null
          endDate={endDate || undefined} // Menggunakan undefined jika endDate adalah null
          minDate={new Date()}
          className={`input input-sm input-bordered w-full ${
            showError ? "input-error" : ""
          }`}
          required={required}
          disabled={disabled}
          isClearable
          placeholderText="Tanggal Mulai"
        />
      <div className="label">
        {showError && (
          <span className="label-text-alt text-error">
            Field ini wajib diisi
          </span>
        )}
      </div>
    </div>

    <div className="form-control">
      <label className="label text-sm" htmlFor={idate}>
      {labelend}
      </label>
      <DatePicker
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={endDate}
          onChange={(date) => handleDateChange(date, false)}
          withPortal
          showTimeSelect
          selectsEnd
          startDate={startDate || undefined} // Menggunakan undefined jika startDate adalah null
          endDate={endDate || undefined} // Menggunakan undefined jika endDate adalah null
          minDate={startDate || new Date()}
          className={`input input-sm input-bordered w-full ${
            showError ? "input-error" : ""
          }`}
          required={required}
          disabled={disabled}
          isClearable
          placeholderText="Tanggal Selesai"
        />
      <div className="label">
        {showError && (
          <span className="label-text-alt text-error">
            Field ini wajib diisi
          </span>
        )}
      </div>
    </div>
    </>
    
  );
};

export default DateRangePicker;