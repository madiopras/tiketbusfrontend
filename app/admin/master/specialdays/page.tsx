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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-2">
        {/* Header Filter */}
        {/* <h1 className="text-2xl font-bold mb-4">User Management</h1> */}
        <CollapsibleCard title="Filter Rute" defaultChecked={true}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
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
          </div>
        </CollapsibleCard>

        {/* Body Table */}
        <CollapsibleCard title="Rute List" defaultChecked={true}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <ActionButtonHeader variant="create" onClick={handleCreate} />
            </div>
            <div className="flex space-x-2">
              <ActionButtonHeader variant="import" />
              <ActionButtonHeader variant="export" />
              <ActionButtonHeader variant="print" />
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
        </CollapsibleCard>
      </div>
    </div>
  );
};

export default RuteListPage;
