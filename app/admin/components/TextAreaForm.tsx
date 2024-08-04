import React from 'react';

interface TextAreaFormProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextAreaForm: React.FC<TextAreaFormProps> = ({ label, name, value, onChange, placeholder = '', required = false, disabled = false }) => {
  return (
    <div className="form-control mb-4">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default TextAreaForm;
