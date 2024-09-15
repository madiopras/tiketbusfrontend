"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import SelectForm from "@/app/admin/components/SelectForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import BusMiniLayoutSeat from "@/app/admin/components/BusMiniLayoutSeat";
import BusLayoutSeat from "@/app/admin/components/BusLayoutSeat";
import BusVipLayoutSeat from "@/app/admin/components/BusVipLayoutSeat";

interface ClassItem {
  id: string;
  class_name: string;
}

const ViewBusesPage = () => {
  const [buses, setBuses] = useState({
    bus_number: "",
    type_bus: "",
    capacity: 0,
    bus_name: "",
    class_id: "",
    description: "",
    is_active: true,
  });
  const [classOptions, setClassOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [seats, setSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchClassNames = useCallback(async () => {
    try {
      const response = await axios.get<{ data: ClassItem[] }>(
        "/api/admin/classes"
      );
      const formattedClassOptions = response.data.data.map((classItem) => ({
        label: classItem.class_name,
        value: classItem.id,
      }));
      setClassOptions(formattedClassOptions);
    } catch (error) {
      console.error("Failed to fetch class names", error);
    }
  }, []);

  const fetchBuses = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/busses/${id}`);
      setBuses(response.data);
    } catch (error) {
      console.error("Failed to fetch bus", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchBuses();
    fetchClassNames();
  }, [fetchBuses, fetchClassNames]);

  // useEffect baru untuk mengupdate state 'seats' berdasarkan data dari database
  useEffect(() => {
    // Jika data bus sudah terisi dan memiliki kapasitas
    if (buses && buses.capacity) {
      const newSeats = Array.from({ length: buses.capacity }, (_, i) => i + 1);
      setSeats(newSeats);
    } else {
      // Jika tidak ada data atau kapasitas 0, kosongkan seats
      setSeats([]);
    }
  }, [buses]); // Jalankan useEffect setiap kali 'buses' berubah

  const handleBack = () => {
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
    <CollapsibleCard title="View Bus" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card rounded-box grid flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputForm
                label="Bus Number"
                variant="text"
                id="bus_number"
                name="bus_number"
                value={buses.bus_number}
                disabled
              />
              <SelectForm
                label="Type Bus"
                id="type_bus"
                name="type_bus"
                value={buses.type_bus}
                options={typeBusOptions}
                disabled
              />
              <SelectForm
                label="Kelas Bus"
                id="class_id"
                name="class_id"
                value={buses.class_id}
                options={classOptions}
                disabled
              />
              <InputForm
                label="Nama Bus"
                variant="text"
                id="bus_name"
                name="bus_name"
                value={buses.bus_name}
                disabled
              />
              <InputForm
                label="Capacity"
                variant="number"
                id="capacity"
                name="capacity"
                value={buses.capacity}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextAreaForm
                label="Description"
                name="description"
                value={buses.description}
                placeholder="Deskripsi Bus"
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RadioFormGroup
                label="Is Active"
                name="is_active"
                value={buses.is_active}
                options={isActiveOptions}
                disabled
              />
            </div>
          </div>
          <div className="divider divider-neutral lg:divider-horizontal">
            Seat
          </div>
          <div className="card rounded-box grid flex-grow">
            {buses.type_bus === "Mini Bus" ? (
              <BusMiniLayoutSeat seats={seats} />
            ) : buses.type_bus === "SHD Bus" ? (
              <BusLayoutSeat seats={seats} />
            ) : buses.type_bus === "VIP Bus" ? (
              <BusVipLayoutSeat seats={seats} />
            ) : (
              <p>Select a bus type to see the layout</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <ActionButtonForm variant="back" onClick={handleBack} />
      </div>
    </CollapsibleCard>
  );
};

export default ViewBusesPage;
