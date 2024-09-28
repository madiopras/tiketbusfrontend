"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import SelectSearchForm from "@/app/admin/components/SelectSearchForm";

interface LocationItem {
  id: number;
  name: string;
}

const mapLocationData = (data: any) => {
  return data.map((item: LocationItem) => ({
    label: item.name,
    value: item.id,
  }));
};

const ViewRutesPage = () => {
  const [rutes, setRutes] = useState({
    start_location_id: 0,
    end_location_id: 0,
    distance: 0,
    price: 0,
  });

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
      console.error("Failed to fetch bus", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRutes();
  }, [fetchRutes]);

  const handleBack = () => {
    router.push("/admin/master/rutes");
  };

  return (
    <CollapsibleCard title="View Bus" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
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
            disabled
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
            disabled
          />
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
      )}

      <div className="flex justify-end space-x-4">
        <ActionButtonForm variant="back" onClick={handleBack} />
      </div>
    </CollapsibleCard>
  );
};

export default ViewRutesPage;
