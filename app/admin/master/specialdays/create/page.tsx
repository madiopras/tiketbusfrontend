"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
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

const CreateSdaysPage: React.FC = () => {
  const [sdays, setSdays] = useState<Sdays>({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    price_percentage: 0,
    is_increase: true,
    is_active: true,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get("token");
      await axios.post("/api/admin/sdays", { ...sdays, create_by_id });
      router.push("/admin/master/specialdays");
    } catch (error) {
      console.error("Failed to create special days", error);
    }
    setLoading(false);
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
    <CollapsibleCard title="Create Special Days" defaultChecked={true}>
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
          <ActionButtonForm variant="submit" isLoading={isLoading} />
        </div>
      </form>
    </CollapsibleCard>
  );
};

export default CreateSdaysPage;
