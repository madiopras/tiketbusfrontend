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
    } catch (error) {
      console.error("Failed to update location", error);
    }
    setLoadingUpdate(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/location");
  };

  const isHasACOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasToiletOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasTVOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasMusicOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasAirMineralOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasWifiOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  const isHasSnackOptions = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        {loading ? (
          <Loading />
        ) : (
          <CollapsibleCard title="Update User" defaultChecked={true}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-4">
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
              
              <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default UpdateLocationsPage;
