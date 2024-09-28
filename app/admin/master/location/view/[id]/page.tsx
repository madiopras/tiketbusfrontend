"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import TextAreaForm from "@/app/admin/components/TextAreaForm";

const ViewlocationsPage = () => {
  const [locations, setlocations] = useState({
    name: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchlocations = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/locations/${id}`);
      setlocations(response.data);
    } catch (error) {
      console.error("Failed to fetch kelas", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchlocations();
  }, [fetchlocations]);

  const handleBack = () => {
    router.push("/admin/master/location");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CollapsibleCard title="View Location" defaultChecked={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm
              label="Name"
              variant="text"
              id="name"
              name="name"
              value={locations.name}
              disabled={true}
            />

            <TextAreaForm
              label="Description"
              name="description"
              value={locations.address}
              placeholder="Deskripsi Bus"
              disabled
            />

            <div className="flex justify-end col-span-3">
              <ActionButtonForm variant="back" onClick={handleBack} />
            </div>
          </div>
        </CollapsibleCard>
      )}
    </div>
  );
};

export default ViewlocationsPage;
