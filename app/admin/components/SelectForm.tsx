import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: Option[];
  required?: boolean;
}

const SelectForm: React.FC<CustomSelectProps> = React.memo(({ id, name, value, onChange, label, options, required = false }) => {
  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="select select-bordered select-sm"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

SelectForm.displayName = 'CustomSelect';

export default SelectForm;
