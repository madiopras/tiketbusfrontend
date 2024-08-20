import React, { useState } from 'react';
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import RadioFormGroup from './RadioForm';
import ReusableModal from "@/app/admin/components/ModalPopUp";

interface AdvanceSearchBusProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filters: any) => void;
}

const AdvanceSearchBus: React.FC<AdvanceSearchBusProps> = ({ isOpen, onClose, onSubmit }) => {
  const [filters, setFilters] = useState({ bus_number: '', bus_name: '', class_name: '', is_active: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleSubmit = () => {
    onSubmit(filters);
    onClose(); // Close the modal after submitting
  };

  const genderOptions = [
    { value: "pria", label: "Pria" },
    { value: "wanita", label: "Wanita" },
  ];

  const isActiveOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  return (
    <ReusableModal
      id="AdvanceSearchBus"
      title="Advanced Search"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-4">
      <InputForm label="Bus Number" variant="text" name="bus_number" value={filters.bus_number} onChange={handleChange} />
      <InputForm label="Nama Bus" variant="text" name="bus_name" value={filters.bus_name} onChange={handleChange} />
      </div>
      
      <RadioFormGroup
        label="Is Active"
        name="is_active"
        value={filters.is_active}
        onChange={handleRadioChange}
        options={isActiveOptions}
      /> 
      <div className="flex justify-end space-x-2">
        <ActionButtonForm variant="reset" onClick={onClose} />
        <ActionButtonForm variant="submit" onClick={handleSubmit} />
      </div>
    </ReusableModal>
  );
};

export default AdvanceSearchBus;
