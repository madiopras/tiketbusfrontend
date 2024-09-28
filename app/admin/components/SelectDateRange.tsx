import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  idate?: string;
  label: string;
  startDate?: Date | null; // Menambahkan properti startDate
  endDate?: Date | null;   // Menambahkan properti endDate
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  required?: boolean; // Menambahkan properti required (opsional)
  disabled?: boolean; // Menambahkan properti disabled (opsional)
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  idate,
  label,
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
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={idate}>
        {label}
      </label>
      <div className="flex gap-4">
        <DatePicker
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={startDate}
          onChange={(date) => handleDateChange(date, true)}
          showTimeSelect
          selectsStart
          startDate={startDate || undefined} // Menggunakan undefined jika startDate adalah null
          endDate={endDate || undefined} // Menggunakan undefined jika endDate adalah null
          className={`input input-sm input-bordered w-40 max-w-x ${
            showError ? "input-error" : ""
          }`}
          required={required}
          disabled={disabled}
          isClearable
          closeOnScroll={true}
          placeholderText="Tanggal Mulai"
        />
        <DatePicker
          dateFormat="dd MMMM yyyy h:mm aa"
          showIcon
          selected={endDate}
          onChange={(date) => handleDateChange(date, false)}
          showTimeSelect
          selectsEnd
          startDate={startDate || undefined} // Menggunakan undefined jika startDate adalah null
          endDate={endDate || undefined} // Menggunakan undefined jika endDate adalah null
          minDate={startDate || undefined}
          className={`input input-sm input-bordered w-40 max-w-x ${
            showError ? "input-error" : ""
          }`}
          required={required}
          disabled={disabled}
          isClearable
          closeOnScroll={true}
          placeholderText="Tanggal Selesai"
        />
      </div>
      <div className="label">
        {showError && (
          <span className="label-text-alt text-error">
            Field ini wajib diisi
          </span>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
