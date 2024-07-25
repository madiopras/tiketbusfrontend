"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from 'js-cookie';
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import SelectForm from "@/app/admin/components/SelectForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";

const CreateUserPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    role: "",
    is_active: true,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get('token');
       // Assuming you store admin ID in localStorage
      await axios.post("/api/admin/users", { ...user, create_by_id });
      router.push("/admin/master/users");
    } catch (error) {
      console.error("Failed to create user", error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/users");
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-2">
        <CollapsibleCard title="Create User" defaultChecked={true}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <InputForm
                label="Name"
                variant="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              />
              <InputForm
                label="Email"
                variant="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
              <InputForm
                label="Phone"
                variant="text"
                id="phone_number"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                required
              />
              <SelectForm
                label="Gender"
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                options={genderOptions}
                required
              />
              <SelectForm
                label="Role"
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                options={roleOptions}
                required
              />
              <InputForm
                label="Password"
                variant="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <RadioFormGroup
                label="Is Active"
                name="is_active"
                value={user.is_active}
                onChange={handleRadioChange}
                options={isActiveOptions}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <ActionButtonForm variant="cancel" onClick={handleCancel} />
              <ActionButtonForm variant="reset" />
              <ActionButtonForm variant="saveasdraft" />
              <ActionButtonForm variant="submit" isLoading={isLoading} />
            </div>
          </form>
        </CollapsibleCard>
      </div>
    </div>
  );
};

export default CreateUserPage;
