"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import RadioFormGroup from "@/app/admin/components/RadioForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import DateRangePicker from "@/app/admin/components/SelectDateRange";

const ViewSdaysPage = () => {
  const [sdays, setSdays] = useState({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    price_percentage: 0,
    is_increase: true,
    is_active: true,
  });
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
      console.error("Failed to fetch bus", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchSdays();
  }, [fetchSdays]);

  const handleBack = () => {
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
    <CollapsibleCard title="View Special Days" defaultChecked={true}>
      {loading ? (
        <Loading />
      ) : (
        <div className="card rounded-box grid flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              label="Special Days"
              variant="text"
              id="name"
              name="name"
              value={sdays.name}
              disabled
            />
            <DateRangePicker
              label="Aktif Special Days"
              disabled
              startDate={sdays.start_date ? new Date(sdays.start_date) : null}
              endDate={sdays.end_date ? new Date(sdays.end_date) : null}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              label="Persentase"
              variant="number"
              id="price_percentage"
              name="price_percentage"
              value={sdays.price_percentage}
              disabled
            />
            <RadioFormGroup
              label="Type"
              name="is_increase"
              value={sdays.is_increase}
              options={isIncrease}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextAreaForm
              label="Description"
              name="description"
              value={sdays.description}
              placeholder="Deskripsi Special Days"
              disabled
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RadioFormGroup
              label="Is Active"
              name="is_active"
              value={sdays.is_active}
              options={isActive}
              disabled
            />
          </div>
          <div className="flex justify-end space-x-4">
            <ActionButtonForm variant="back" onClick={handleBack} />
          </div>
        </div>
      )}
    </CollapsibleCard>
  );
};

export default ViewSdaysPage;
