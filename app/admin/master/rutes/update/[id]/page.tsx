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
import SelectSearchForm from "@/app/admin/components/SelectSearchForm";

interface LocationItem {
  id: number;
  name: string;
}

interface Rute {
  start_location_id: number;
  end_location_id: number;
  distance: number;
  price: number;
}

const mapLocationData = (data: any) => {
  return data.map((item: LocationItem) => ({
    label: item.name,
    value: item.id,
  }));
};

const UpdateRutesPage = () => {
  const [rutes, setRutes] = useState<Rute>({
    start_location_id: 0,
    end_location_id: 0,
    distance: 0,
    price: 0,
  });
  const [isLoading, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchRutes = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/routes/${id}`);
      setRutes(response.data);
    } catch (error) {
      console.error("Failed to fetch rutes", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRutes();
  }, [fetchRutes]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRutes((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const token = Cookies.get("token");
      await axios.put(`/api/admin/routes/${id}`, rutes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/admin/master/rutes");
    } catch (error) {
      console.error("Failed to update rute", error);
    }
    setLoadingUpdate(false);
  };

  const handleCancel = () => {
    router.push("/admin/master/rutes");
  };

  return (
    <CollapsibleCard title="Edit Rute" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectSearchForm
              label="Lokasi Awal"
              name="start_location_id"
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
            <SelectSearchForm
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
            <ActionButtonForm variant="update" isLoading={isLoading} />
          </div>
        </form>
      )}
    </CollapsibleCard>
  );
};

export default UpdateRutesPage;
