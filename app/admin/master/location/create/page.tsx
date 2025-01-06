"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const CreateLocationsPage = () => {
  const [Locations, setLocations] = useState({
    name: "",
    address: "",
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocations((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocations((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get("token");
      // Assuming you store admin ID in localStorage
      await axios.post("/api/admin/locations", { ...Locations, create_by_id });
      router.push("/admin/master/location");
      showSuccessToast("Location created successfully!");
    } catch (error : any) {
      console.error("Failed to create Locations", error);

      // Menangani kesalahan berdasarkan status HTTP
      if (error.response) {
        // Jika respons ada
        if (error.response.status === 400) {
          showErrorToast("Permintaan tidak valid. Silakan periksa data yang dimasukkan.");
        } else if (error.response.status === 500) {
          showErrorToast("Terjadi masalah di server. Silakan coba lagi nanti.");
        } else if (error.response.data && error.response.data.message) {
          showErrorToast(error.response.data.message); // Menampilkan pesan error dari API
        } else {
          showErrorToast("Terjadi kesalahan yang tidak terduga.");
        }
      } else {
        // Jika tidak ada response dari server
        showErrorToast("Tidak dapat terhubung ke server. Silakan coba lagi.");
      }
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/location");
  };

  return (
    <div>
      <CollapsibleCard title="Create Locations" defaultChecked={true}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputForm
            label="Name"
            variant="text"
            id="name"
            name="name"
            value={Locations.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextAreaForm
            label="address"
            name="address"
            value={Locations.address}
            onChange={handleChangeTextArea}
            placeholder="Deskripsi location Bus"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <ActionButtonForm variant="cancel" onClick={handleCancel} />
          <ActionButtonForm variant="submit" isLoading={isLoading} />
        </div>
      </form>
    </CollapsibleCard>
    </div>
    
  );
};

export default CreateLocationsPage;
