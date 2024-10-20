"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import ActionButtonHeader from "../components/ActionButtonHeader";
import CollapsibleCard from "../components/CollapsibleCard";
import InputForm from "../components/InputForm";
import SdaysTable from "../components/TableSdays";
import ScheduleTable from "../components/TableSchedule";

const CreateSchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    name: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const fetchschedule = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/schedules", {
        params: {
          name: search.name,
          page: page,
          limit: 10,
        },
      });
      setSchedule(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Failed to fetch schedule", error);
    }
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchschedule();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchschedule]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const confirmDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/api/admin/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchschedule();
    } catch (error) {
      console.error("Failed to delete schedules", error);
    }
  };

  const handleCreate = () => {
    router.push("/admin/schedule/create");
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/schedule/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/admin/schedule/view/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleExport = () => {
    // Implementasikan logika untuk mengekspor data
    console.log("Export data");
  };

  const handlePrint = () => {
    // Implementasikan logika untuk mencetak data
    window.print();
  };

  return (
    <div>
      {/* Header Filter */}
      {/* <h1 className="text-2xl font-bold mb-4">User Management</h1> */}
      <CollapsibleCard title="Filter Schedule" defaultChecked={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputForm
            label="Kode Bus"  
            variant="text"
            name="name"
            value={search.name}
            onChange={handleSearchChange}
          />
        </div>
      </CollapsibleCard>

      <div className="card rounded-md bg-base-100 shadow-lg mb-4 p-4">
        <div className="flex flex-row">
          <div className="basis-1/2">
            <ActionButtonHeader variant="create" onClick={handleCreate} />
          </div>
          <div className="basis-1/2 absolute right-4">
            {/* Untuk Isian button nantinya */}
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <ScheduleTable
          schedule={schedule}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          handleUpdate={handleUpdate}
          handleView={handleView}
          confirmDelete={confirmDelete}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CreateSchedulePage;
