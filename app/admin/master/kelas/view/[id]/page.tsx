"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import InputForm from "@/app/admin/components/InputForm";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";

const ViewClassesPage = () => {
  const [classes, setClasses] = useState({
    class_name: "",
    description: "",
    has_ac: true,
    has_toilet: true,
    has_tv: true,
    has_music: true,
    has_air_mineral: true,
    has_wifi: true,
    has_snack: true,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchClasses = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/classes/${id}`);
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch kelas", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleBack = () => {
    router.push("/admin/master/kelas");
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <CollapsibleCard title="View User" defaultChecked={true}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputForm
              label="Name"
              variant="text"
              id="class_name"
              name="class_name"
              value={classes.class_name}
              disabled={true}
            />
            <InputForm
              label="AC"
              variant="text"
              id="has_ac"
              name="has_ac"
              value={classes.has_ac ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="Toilet"
              variant="text"
              id="has_toilet"
              name="has_toilet"
              value={classes.has_toilet ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="TV"
              variant="text"
              id="has_tv"
              name="has_tv"
              value={classes.has_tv ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="Music"
              variant="text"
              id="has_music"
              name="has_music"
              value={classes.has_music ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="Air Mineral"
              variant="text"
              id="has_air_mineral"
              name="has_air_mineral"
              value={classes.has_air_mineral ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="Wifi"
              variant="text"
              id="has_wifi"
              name="has_wifi"
              value={classes.has_wifi ? "Ya" : "Tidak"}
              disabled={true}
            />
            <InputForm
              label="Snack"
              variant="text"
              id="has_snack"
              name="has_snack"
              value={classes.has_snack ? "Ya" : "Tidak"}
              disabled={true}
            />
            
          </div>
          <div className="flex justify-end col-span-3">
              <ActionButtonForm variant="back" onClick={handleBack} />
            </div>
        </CollapsibleCard>
      )}
    </div>
  );
};

export default ViewClassesPage;
