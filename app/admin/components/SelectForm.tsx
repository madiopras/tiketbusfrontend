import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
}

const SelectForm: React.FC<CustomSelectProps> = React.memo(({ id, name, value, onChange, label, options, required = false, disabled = false }) => {
  const [showError, setShowError] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
    // Periksa apakah value yang dipilih kosong dan select diharuskan
    setShowError(required && e.target.value === ''); 
  };

  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleSelectChange}
        className={`select select-bordered select-sm ${showError ? 'select-error' : ''}`}
        required={required}
        disabled={disabled}
      >
        <option value="">Select {label}</option> {/* Opsi default dengan value kosong */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="label">
      {showError && (
        <span className="label-text-alt text-error">Field ini wajib diisi</span>
      )}
      </div>
    </div>
  );
});

SelectForm.displayName = 'CustomSelect';

export default SelectForm;