"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import SelectForm from "@/app/admin/components/SelectForm";

interface LocationItem {
  id: number;
  name: string;
}

const ViewRutesPage = () => {
  const [rutes, setRutes] = useState({
    start_location_id: 0,
    end_location_id: 0,
    distance: 0,
    price: 0
  });
  const [locationOptions, setLocationOption] = useState<
    { label: string; value: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchLocationNames = useCallback(async () => {
    try {
      const response = await axios.get<{ data: LocationItem[] }>(
        "/api/admin/locations"
      );
      const formattedLocationOptions = response.data.data.map((LocationItem) => ({
        label: LocationItem.name,
        value: LocationItem.id,
      }));
      setLocationOption(formattedLocationOptions);
    } catch (error) {
      console.error("Failed to fetch location names", error);
    }
  }, []);

  const fetchRutes = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/routes/${id}`);
      setRutes(response.data);
    } catch (error) {
      console.error("Failed to fetch bus", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRutes();
    fetchLocationNames();
  }, [fetchRutes, fetchLocationNames]);

  const handleBack = () => {
    router.push("/admin/master/rutes");
  };

 

  return (
    <CollapsibleCard title="View Bus" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card rounded-box grid flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectForm label="Lokasi Awal" id="start_location_id" name="start_location_id" value={rutes.start_location_id}  options={locationOptions} disabled />
              <SelectForm label="Tujuan" id="end_location_id" name="end_location_id" value={rutes.end_location_id}  options={locationOptions} disabled />
              <InputForm
                label="Jarak"
                variant="number"
                id="distance"
                name="distance"
                value={rutes.distance}
                disabled
              />
              <InputForm
                label="Harga"
                variant="number"
                id="price"
                name="price"
                value={rutes.price}
                disabled
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <ActionButtonForm variant="back" onClick={handleBack} />
      </div>
    </CollapsibleCard>
  );
};

export default ViewRutesPage;
