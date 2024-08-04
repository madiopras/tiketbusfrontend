import React from 'react';

interface CustomRadioGroupProps {
  name: string;
  value: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: { label: string; value: boolean }[];
  disabled?: boolean;
}

const RadioFormGroup: React.FC<CustomRadioGroupProps> = React.memo(({ name, value, onChange, label, options, disabled = false }) => {
  return (
    <div className="form-control mb-2">
      <label className="label text-sm">{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value.toString()} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value.toString()}
              checked={value === option.value}
              onChange={onChange}
              className="radio radio-primary text-sm"
              disabled={disabled}
            />
            <span className="ml-2 text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

RadioFormGroup.displayName= 'RadioFormGroup';

export default RadioFormGroup;
