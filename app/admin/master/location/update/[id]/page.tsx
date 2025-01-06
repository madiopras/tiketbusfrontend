"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import Loading from "./loading";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const UpdateLocationsPage = () => {
  const [Locations, setLocations] = useState({
    name: "",
    address: "",
  });
  const [isLoading, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchLocations = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/locations/${id}`);
      setLocations(response.data);
    } catch (error) {
      console.error("Failed to fetch location", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocations((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocations((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocations((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const token = Cookies.get("token");
      await axios.put(`/api/admin/locations/${id}`, Locations, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/admin/master/location");
      showSuccessToast("Location updated successfully!");
    } catch (error : any) {
      console.error("Failed to update location", error);

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
    setLoadingUpdate(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/location");
  };

  return (
    <div>
        {loading ? (
          <Loading />
        ) : (
          <CollapsibleCard title="Update User" defaultChecked={true}>
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <ActionButtonForm variant="update" isLoading={isLoading} />
              </div>
            </form>
          </CollapsibleCard>
        )}
      </div>
  );
};

export default UpdateLocationsPage;
