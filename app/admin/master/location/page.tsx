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
    <div>
      {/* Header Filter */}
      {/* <h1 className="text-2xl font-bold mb-4">User Management</h1> */}
      <CollapsibleCard title="Filter location Bus" defaultChecked={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default LocationsListPage;
