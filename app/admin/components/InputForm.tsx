import React from 'react';

interface CustomInputProps {
  variant: 'text' | 'email' | 'password' | 'number';
  id?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const InputForm: React.FC<CustomInputProps> = React.memo(({
  variant,
  id = '',
  name,
  value = '',
  onChange = () => {},
  label,
  disabled = false,
  required = false
}) => {
  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={id}>{label}</label>
      <input
        type={variant}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="input input-sm input-bordered"
        required={required}
        disabled={disabled}
      />
    </div>
  );
});

InputForm.displayName = 'InputForm';

export default InputForm;
