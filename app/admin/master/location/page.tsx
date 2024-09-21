"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import LocationsTable from "../../components/TableLocations";
import Loading from "./loading";
import ActionButtonHeader from "../../components/ActionButtonHeader";
import CollapsibleCard from "../../components/CollapsibleCard";
import InputForm from "../../components/InputForm";

const LocationsListPage = () => {
  const [users, setUlocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ name: "", address: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const fetchlocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/locations", {
        params: {
          name: search.name,
          address: search.address,
          page: page,
          limit: 10,
        },
      });
      setUlocations(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchlocations();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchlocations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearchChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setSearch((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/api/admin/locations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchlocations();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleCreate = () => {
    router.push("/admin/master/location/create");
  };
  
  const handleUpdate = (id: number) => {
    router.push(`/admin/master/location/update/${id}`);
  }; 

  const handleView = (id: number) => {
    router.push(`/admin/master/location/view/${id}`);
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
        <CollapsibleCard title="Filter location Bus" defaultChecked={true}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <InputForm
                label="Search By location"
                variant="text"
                name="name"
                value={search.name}
                onChange={handleSearchChange}
              />
              <InputForm
                label="Search By address"
                variant="text"
                name="address"
                value={search.address}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CollapsibleCard>

        {/* Body Table */}
        <CollapsibleCard title="List location Bus" defaultChecked={true}>
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
            <LocationsTable
              locations={users}
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

export default LocationsListPage;
