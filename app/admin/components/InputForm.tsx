import React, { useState } from 'react';

interface TextInputProps {
  variant: 'text' | 'email' | 'password';
  id?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

interface NumberInputProps {
  variant: 'number';
  id?: string;
  name: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

type CustomInputProps = TextInputProps | NumberInputProps;

const InputForm: React.FC<CustomInputProps> = React.memo(({
  variant,
  id = '',
  name,
  value,
  onChange = () => {},
  label,
  disabled = false,
  required = false
}) => {
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  
    // Periksa apakah value kosong atau 0, dan input required
    const isEmptyOrZero = !e.target.value || (variant === 'number' && parseInt(e.target.value, 10) === 0);
    setShowError(required && isEmptyOrZero); 
  };

  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={id}>{label}</label>
      <input
        type={variant}
        id={id}
        name={name}
        value={variant === 'number' ? (value as number).toString() : value as string}
        onChange={handleInputChange}
        className={`input input-sm input-bordered ${showError ? 'input-error' : ''}`} // Tambahkan class error jika diperlukan
        required={required}
        disabled={disabled}
      />
      <div className="label">
      {showError && (
        <span className="label-text-alt text-error">Field ini wajib diisi</span>
      )}
      </div>

      
    </div>
  );
});

InputForm.displayName = 'InputForm';

export default InputForm;