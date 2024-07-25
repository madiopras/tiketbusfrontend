"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";

const UpdateClassesPage = () => {
  const [classes, setClasses] = useState({
    class_name: "",
    description: "",
    has_ac: true,
    has_toilet: true,
    has_tv: true,
    has_music: true,
    has_air_mineral: true,
    has_wifi: true,
    has_snack: true,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const fetchClasses = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/classes/${id}`);
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch kelas", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClasses((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClasses((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClasses((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await axios.put(`/api/admin/classes/${id}`, classes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/admin/master/kelas");
    } catch (error) {
      console.error("Failed to update kelas", error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/kelas");
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
        <CollapsibleCard title="Update User" defaultChecked={true}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <InputForm
                label="Name"
                variant="text"
                id="class_name"
                name="class_name"
                value={classes.class_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <RadioFormGroup
                label="AC"
                name="has_ac"
                value={classes.has_ac}
                onChange={handleRadioChange}
                options={isHasACOptions}
              />
              <RadioFormGroup
                label="Toilet"
                name="has_toilet"
                value={classes.has_toilet}
                onChange={handleRadioChange}
                options={isHasToiletOptions}
              />
              <RadioFormGroup
                label="TV"
                name="has_tv"
                value={classes.has_tv}
                onChange={handleRadioChange}
                options={isHasTVOptions}
              />
              <RadioFormGroup
                label="Musik"
                name="has_music"
                value={classes.has_music}
                onChange={handleRadioChange}
                options={isHasMusicOptions}
              />
              <RadioFormGroup
                label="Air Mineral"
                name="has_air_mineral"
                value={classes.has_air_mineral}
                onChange={handleRadioChange}
                options={isHasAirMineralOptions}
              />
              <RadioFormGroup
                label="Wifi"
                name="has_wifi"
                value={classes.has_wifi}
                onChange={handleRadioChange}
                options={isHasWifiOptions}
              />
              <RadioFormGroup
                label="Snack"
                name="has_snack"
                value={classes.has_snack}
                onChange={handleRadioChange}
                options={isHasSnackOptions}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextAreaForm
                label="Description"
                name="description"
                value={classes.description}
                onChange={handleChangeTextArea}
                placeholder="Deskripsi Kelas Bus"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <ActionButtonForm variant="cancel" onClick={handleCancel} />
              <ActionButtonForm variant="update" isLoading={isLoading} />
            </div>
          </form>
        </CollapsibleCard>
      </div>
    </div>
  );
};

export default UpdateClassesPage;
