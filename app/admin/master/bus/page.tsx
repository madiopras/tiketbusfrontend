"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import BusTable from "../../components/TableBus";
import Loading from "./loading";
import ActionButtonHeader from "../../components/ActionButtonHeader";
import CollapsibleCard from "../../components/CollapsibleCard";
import InputForm from "../../components/InputForm";
import ActionButtonForm from "../../components/ActionButtonForm";
import SelectForm from "../../components/SelectForm";
import AdvanceSearchBus from "../../components/AdvanceSearchBus";

const BusListPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    bus_number: "",
    type_bus: "",
    bus_name: "",
    class_name: "",
    is_active: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isAdvanceSearchBusOpen, setIsAdvanceSearchBusOpen] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const router = useRouter();

  const fetchBuses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/busses", {
        params: {
          bus_number: search.bus_number,
          type_bus: search.type_bus,
          bus_name: search.bus_name,
          class_name: search.class_name,
          is_active: search.is_active,
          page: page,
          limit: 10,
        },
      });
      setBuses(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Failed to fetch buses", error);
    }
    setLoading(false);
  }, [search, page]);

  const fetchClassNames = useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/classes");
      const formattedClassOptions = response.data.data.map(
        (classItem: { class_name: any }) => ({
          label: classItem.class_name,
          value: classItem.class_name,
        })
      );
      setClassOptions(formattedClassOptions);
    } catch (error) {
      console.error("Failed to fetch class names", error);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBuses();
      fetchClassNames();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchBuses, fetchClassNames]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  const confirmDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`/api/admin/busses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBuses();
    } catch (error) {
      console.error("Failed to delete bus", error);
    }
  };

  const handleCreate = () => {
    router.push("/admin/master/bus/create");
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/master/bus/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/admin/master/bus/view/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAdvanceSearchClick = () => {
    setIsAdvanceSearchBusOpen(true);
  };

  const handleAdvanceSearchClose = () => {
    setIsAdvanceSearchBusOpen(false);
  };

  const handleAdvanceSearchSubmit = (
    filters: React.SetStateAction<{
      bus_number: string;
      bus_name: string;
      is_active: string;
    }>
  ) => {
    setSearch(filters);
    setIsAdvanceSearchBusOpen(false);
  };

  const typebusOptions = [
    { value: "SHD Bus", label: "SHD Bus" },
    { value: "Mini Bus", label: "Mini Bus" },
    { value: "VIP Bus", label: "VIP Bus" },
  ];

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
        <CollapsibleCard title="Filter Bus" defaultChecked={true}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <InputForm
                label="Search By No. Bus"
                variant="text"
                name="bus_number"
                value={search.bus_number}
                onChange={handleSearchChange}
              />
              <SelectForm
                label="Jenis Bus"
                id="type_bus"
                name="type_bus"
                value={search.type_bus}
                onChange={handleSelectChange}
                options={typebusOptions}
              />
              <SelectForm
                label="Kelas"
                id="class_name"
                name="class_name"
                value={search.class_name}
                onChange={handleSelectChange}
                options={classOptions}
              />
              <ActionButtonForm
                variant="cari"
                onClick={handleAdvanceSearchClick}
              />
            </div>
          </div>
        </CollapsibleCard>

        {/* Body Table */}
        <CollapsibleCard title="Bus List" defaultChecked={true}>
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
            <BusTable
              buses={buses}
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
      <AdvanceSearchBus
        isOpen={isAdvanceSearchBusOpen}
        onClose={handleAdvanceSearchClose}
        onSubmit={handleAdvanceSearchSubmit}
      />
    </div>
  );
};

export default BusListPage;
