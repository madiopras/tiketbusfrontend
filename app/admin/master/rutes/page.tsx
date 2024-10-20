"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import ActionButtonHeader from "../../components/ActionButtonHeader";
import CollapsibleCard from "../../components/CollapsibleCard";
import InputForm from "../../components/InputForm";
import RutesTable from "../../components/TableRutes";

const RuteListPage = () => {
  const [rutes, setRutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    start_location: "",
    end_location: "",
    distance: "",
    price: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const fetchRutes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/routes", {
        params: {
          start_location: search.start_location,
          end_location: search.end_location,
          distance: search.distance,
          price: search.price,
          page: page,
          limit: 10,
        },
      });
      setRutes(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Failed to fetch rutes", error);
    }
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRutes();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchRutes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const confirmDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/api/admin/routes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRutes();
    } catch (error) {
      console.error("Failed to delete rute", error);
    }
  };

  const handleCreate = () => {
    router.push("/admin/master/rutes/create");
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/master/rutes/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/admin/master/rutes/view/${id}`);
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
      <CollapsibleCard title="Filter Rute" defaultChecked={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputForm
            label="Asal"
            variant="text"
            name="start_location"
            value={search.start_location}
            onChange={handleSearchChange}
          />
          <InputForm
            label="Tujuan"
            variant="text"
            name="end_location"
            value={search.end_location}
            onChange={handleSearchChange}
          />
        </div>
      </CollapsibleCard>

      {/* Body Table */}

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
        <RutesTable
          rutes={rutes}
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

export default RuteListPage;
