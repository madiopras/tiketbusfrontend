"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import DateRangePicker from "@/app/admin/components/SelectDateRange";

interface Sdays {
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  price_percentage: number;
  is_increase: boolean;
  is_active: boolean;
}

const UpdateSdaysPage = () => {
  const [sdays, setSdays] = useState<Sdays>({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    price_percentage: 0,
    is_increase: true,
    is_active: true,
  });
  const [isLoading, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchSdays = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/sdays/${id}`);
      setSdays(response.data);
    } catch (error) {
      console.error("Failed to fetch special days", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchSdays();
  }, [fetchSdays, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSdays((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSdays((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSdays((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setSdays((prevState) => ({
        ...prevState,
        start_date: date.toISOString(),
      }));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setSdays((prevState) => ({
        ...prevState,
        end_date: date.toISOString(),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const token = Cookies.get("token");
      await axios.put(`/api/admin/sdays/${id}`, sdays, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/admin/master/specialdays");
    } catch (error) {
      console.error("Failed to update special days", error);
    }
    setLoadingUpdate(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/specialdays");
  };

  const isIncrease = [
    { label: "Markup", value: true },
    { label: "Diskon", value: false },
  ];
  const isActive = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  return (
    <CollapsibleCard title="Edit Special Days" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              label="Special Days"
              variant="text"
              id="name"
              name="name"
              value={sdays.name}
              onChange={handleChange}
              required
            />
            <DateRangePicker
              labelstart="Tanggal Aktif"
              labelend="Tanggal Berakhir"
              required
              startDate={sdays.start_date ? new Date(sdays.start_date) : null}
              endDate={sdays.end_date ? new Date(sdays.end_date) : null}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              label="Persentase"
              variant="number"
              id="price_percentage"
              name="price_percentage"
              value={sdays.price_percentage}
              onChange={handleChange}
              required
            />
            <RadioFormGroup
              label="Type"
              name="is_increase"
              value={sdays.is_increase}
              onChange={handleRadioChange}
              options={isIncrease}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextAreaForm
              label="Description"
              name="description"
              value={sdays.description}
              onChange={handleChangeTextArea}
              placeholder="Deskripsi Special Days"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RadioFormGroup
              label="Is Active"
              name="is_active"
              value={sdays.is_active}
              onChange={handleRadioChange}
              options={isActive}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <ActionButtonForm variant="cancel" onClick={handleCancel} />
            <ActionButtonForm variant="update" isLoading={isLoading} />
          </div>
        </form>
      )}
    </CollapsibleCard>
  );
};

export default UpdateSdaysPage;
