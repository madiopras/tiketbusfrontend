"use client";

import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import SelectForm from "@/app/admin/components/SelectForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import BusLayoutSeat from "@/app/admin/components/BusLayoutSeat";
import BusMiniLayoutSeat from "@/app/admin/components/BusMiniLayoutSeat";
import BusVipLayoutSeat from "@/app/admin/components/BusVipLayoutSeat";

interface ClassItem {
  id: string;
  class_name: string;
}

interface Bus {
  bus_number: string;
  type_bus: string;
  bus_name: string;
  description: string;
  capacity: number;
  class_id: string;
  is_active: boolean;
}

const CreateBusesPage: React.FC = () => {
  const [buses, setBuses] = useState<Bus>({
    bus_number: "",
    type_bus: "",
    bus_name: "",
    description: "",
    capacity: 0,
    class_id: "",
    is_active: true,
  });
  const [classOptions, setClassOptions] = useState<{ label: string; value: string }[]>([]);
  const [seats, setSeats] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const fetchClassNames = useCallback(async () => {
    try {
      const response = await axios.get<{ data: ClassItem[] }>("/api/admin/classes");
      const formattedClassOptions = response.data.data.map((classItem) => ({
        label: classItem.class_name,
        value: classItem.id,
      }));
      setClassOptions(formattedClassOptions);
    } catch (error) {
      console.error("Failed to fetch class names", error);
    }
  }, []);

  useEffect(() => {
    fetchClassNames();
  }, [fetchClassNames]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "type_bus") {
      if (value === "Mini Bus") {
        setBuses((prevState) => ({ ...prevState, type_bus: value, capacity: 10 }));
        setSeats(Array.from({ length: 10 }, (_, i) => i + 1));
      } else {
        setBuses((prevState) => ({ ...prevState, type_bus: value, capacity: 0 }));
        setSeats([]);
      }
    } else if (name === "capacity") {
      //const numericalValue = value.replace(/\D/g, ''); // Menghapus semua karakter non-digit
      const newCapacity = parseInt(value, 10);
      if (!isNaN(newCapacity) && newCapacity > 0 && newCapacity <= 50) {
        setBuses((prevState) => ({ ...prevState, [name]: newCapacity }));
        const newSeats = [];
        for (let i = 0; i < newCapacity; i++) {
          newSeats.push(i + 1);
        }
        setSeats(newSeats);
      } else {
        setBuses((prevState) => ({ ...prevState, [name]: 0 }));
        setSeats([]);
      }
    } else {
      setBuses((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuses((prevState) => ({ ...prevState, [name]: value === "true" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get("token");
      await axios.post("/api/admin/busses", { ...buses, create_by_id });
      router.push("/admin/master/bus");
    } catch (error) {
      console.error("Failed to create buses", error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/bus");
  };

  const typeBusOptions = [
    { value: "SHD Bus", label: "SHD Bus" },
    { value: "Mini Bus", label: "Mini Bus" },
    { value: "VIP Bus", label: "VIP Bus" },
  ];

  const isActiveOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  return (
    <CollapsibleCard title="Create Bus" defaultChecked={true}>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card rounded-box grid flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputForm
                label="Bus Number"
                variant="text"
                id="bus_number"
                name="bus_number"
                value={buses.bus_number}
                onChange={handleChange}
                required
              />
              <SelectForm label="Type Bus" id="type_bus" name="type_bus" value={buses.type_bus} onChange={handleChange} options={typeBusOptions} required />
              <SelectForm label="Kelas Bus" id="class_id" name="class_id" value={buses.class_id} onChange={handleChange} options={classOptions} required />
              <InputForm
                label="Nama Bus"
                variant="text"
                id="bus_name"
                name="bus_name"
                value={buses.bus_name}
                onChange={handleChange}
                required
              />
              <InputForm
                label="Capacity"
                variant="number"
                id="capacity"
                name="capacity"
                value={buses.capacity}
                onChange={handleChange}
                required
                disabled={buses.type_bus === "Mini Bus"}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextAreaForm
                label="Description"
                name="description"
                value={buses.description}
                onChange={handleChange}
                placeholder="Deskripsi Bus"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RadioFormGroup
                label="Is Active"
                name="is_active"
                value={buses.is_active}
                onChange={handleRadioChange}
                options={isActiveOptions}
              />
            </div>
          </div>
          <div className="divider divider-neutral lg:divider-horizontal">Seat</div>
          <div className="card rounded-box grid flex-grow">
          {buses.type_bus === "Mini Bus" ? (
              <BusMiniLayoutSeat seats={seats} />
            ) : buses.type_bus === "SHD Bus" ? (
              <BusLayoutSeat seats={seats} />
            ) : buses.type_bus === "VIP Bus" ? (
              <BusVipLayoutSeat seats={seats} />
            ): (
              <p>Select a bus type to see the layout</p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <ActionButtonForm variant="cancel" onClick={handleCancel} />
          <ActionButtonForm variant="submit" isLoading={isLoading} />
        </div>
      </form>
    </CollapsibleCard>
  );
};

export default CreateBusesPage;
