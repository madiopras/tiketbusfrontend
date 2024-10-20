"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import SelectSerachForm from "@/app/admin/components/SelectSearchForm";

interface Rute {
  start_location_id: number;
  end_location_id: number;
  distance: number;
  price: number;
}

interface LocationItem {
  id: number;
  name: string;
}

// Fungsi untuk memetakan data lokasi
const mapLocationData = (data: any) => {
  return data.map((item: LocationItem) => ({
    label: item.name,
    value: item.id,
  }));
};

const CreateRutesPage: React.FC = () => {
  const [rutes, setRutes] = useState<Rute>({
    start_location_id: 0,
    end_location_id: 0,
    distance: 0,
    price: 0,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRutes((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get("token");
      await axios.post("/api/admin/routes", { ...rutes, create_by_id });
      router.push("/admin/master/rutes");
    } catch (error) {
      console.error("Gagal membuat rute", error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/rutes");
  };

  return (
    <CollapsibleCard title="Buat Rute" defaultChecked={true}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectSerachForm
            label="Lokasi Awal"
            name="location_id"
            value={rutes.start_location_id}
            onChange={(value) =>
              setRutes((prevState) => ({
                ...prevState,
                start_location_id: value,
              }))
            }
            apiEndpoint="/api/admin/locations"
            mapData={mapLocationData}
            required
          />
          <SelectSerachForm
            label="Tujuan"
            name="end_location_id"
            value={rutes.end_location_id}
            onChange={(value) =>
              setRutes((prevState) => ({
                ...prevState,
                end_location_id: value,
              }))
            }
            apiEndpoint="/api/admin/locations"
            mapData={mapLocationData}
            required
          />
          <InputForm
            label="Jarak"
            variant="number"
            id="distance"
            name="distance"
            value={rutes.distance}
            onChange={handleChange}
            required
          />
          <InputForm
            label="Harga"
            variant="number"
            id="price"
            name="price"
            value={rutes.price}
            onChange={handleChange}
            required
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

export default CreateRutesPage;
