"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import SelectForm from "@/app/admin/components/SelectForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";

const UpdateUserPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    role: "",
    is_active: true,
  });
  const [isLoading, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchUser = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
    setLoadingUpdate(true);
    try {
      const token = Cookies.get("token");
      await axios.put(`/api/admin/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/admin/master/users");
    } catch (error) {
      console.error("Failed to update user", error);
    }
    setLoadingUpdate(false);
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CollapsibleCard title="Update User" defaultChecked={true}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                disabled={true}
              />
              <InputForm
                label="Phone"
                variant="text"
                id="phone_number"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <ActionButtonForm variant="update" isLoading={isLoading} />
            </div>
          </form>
        </CollapsibleCard>
      )}
    </div>
  );
};

export default UpdateUserPage; 
