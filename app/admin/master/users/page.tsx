"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import UserTable from "../../components/TableUser";
import Loading from "./loading";
import ActionButtonHeader from "../../components/ActionButtonHeader";
import CollapsibleCard from "../../components/CollapsibleCard";
import InputForm from "../../components/InputForm";
import ActionButtonForm from "../../components/ActionButtonForm";
import AdvanceSearchUser from "../../components/AdvanceSearchUser";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    name: "",
    phone_number: "",
    email: "",
    gender: "",
    role: "",
    is_active: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isAdvanceSearchUserOpen, setIsAdvanceSearchUserOpen] = useState(false);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/users", {
        params: {
          name: search.name,
          phone_number: search.phone_number,
          email: search.email,
          gender: search.gender,
          role: search.role,
          is_active: search.is_active,
          page: page,
          limit: 10,
        },
      });
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchUsers]);

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
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleCreate = () => {
    router.push("/admin/master/users/create");
  };

  const handleUpdate = (id: number) => {
    router.push(`/admin/master/users/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/admin/master/users/view/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAdvanceSearchClick = () => {
    setIsAdvanceSearchUserOpen(true);
  };

  const handleAdvanceSearchClose = () => {
    setIsAdvanceSearchUserOpen(false);
  };

  const handleAdvanceSearchSubmit = (
    filters: React.SetStateAction<{
      name: string;
      phone_number: string;
      email: string;
      gender: string;
      role: string;
      is_active: string;
    }>
  ) => {
    setSearch(filters);
    setIsAdvanceSearchUserOpen(false);
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
      <CollapsibleCard title="Filter User" defaultChecked={true}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputForm
            label="Search By Name"
            variant="text"
            name="name"
            value={search.name}
            onChange={handleSearchChange}
          />
          <InputForm
            label="Search By Phone Number"
            variant="text"
            name="phone_number"
            value={search.phone_number}
            onChange={handleSearchChangePhone}
          />
          <ActionButtonForm variant="cari" onClick={handleAdvanceSearchClick} />
        </div>
      </CollapsibleCard>

      <div className="card rounded-md bg-base-100 shadow-lg mb-4 p-4">
        <div className="flex flex-row">
          <div className="basis-1/2">
            <ActionButtonHeader variant="create" onClick={handleCreate} />
          </div>
          <div className="basis-1/2 absolute right-4">
            {/* Untuk Isian button nantinya */}
            <ActionButtonHeader variant="import" />
            <ActionButtonHeader variant="export" />
            <ActionButtonHeader variant="print" />
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <UserTable
          users={users}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          handleUpdate={handleUpdate}
          handleView={handleView}
          confirmDelete={confirmDelete}
          handlePageChange={handlePageChange}
        />
      )}

      <AdvanceSearchUser
        isOpen={isAdvanceSearchUserOpen}
        onClose={handleAdvanceSearchClose}
        onSubmit={handleAdvanceSearchSubmit}
      />
    </div>
  );
};

export default UserListPage;
