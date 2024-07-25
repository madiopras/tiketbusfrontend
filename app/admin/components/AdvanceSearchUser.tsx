import React, { useState } from 'react';
import InputForm from "@/app/admin/components/InputForm";
import SelectForm from "@/app/admin/components/SelectForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import RadioFormGroup from './RadioForm';
import ReusableModal from "@/app/admin/components/ModalPopUp";

interface AdvanceSearchUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (filters: any) => void;
}

const AdvanceSearchUser: React.FC<AdvanceSearchUserProps> = ({ isOpen, onClose, onSubmit }) => {
  const [filters, setFilters] = useState({ name: '', email: '', phone_number: '', gender: '', role: '', is_active: true });

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

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "kasir", label: "Kasir Loket" },
    { value: "customer", label: "Customer" },
  ];

  const isActiveOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  return (
    <ReusableModal
      id="advanceSearchUser"
      title="Advanced Search"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-4">
      <InputForm label="Name" variant="text" name="name" value={filters.name} onChange={handleChange} />
      <InputForm label="Email" variant="email" name="email" value={filters.email} onChange={handleChange} />
      <InputForm label="Phone Number" variant="text" name="phone_number" value={filters.phone_number} onChange={handleChange} />
      <SelectForm label="Gender" id="gender" name="gender" value={filters.gender} onChange={handleChange} options={genderOptions} />
      <SelectForm label="Role" id="role" name="role" value={filters.role} onChange={handleChange} options={roleOptions} />
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

export default AdvanceSearchUser;
