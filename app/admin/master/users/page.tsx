'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState({ name: '', phone_number: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, [search, page]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/admin/users', {
                params: {
                    name: search.name,
                    phone_number: search.phone_number,
                    page: page,
                    limit: 10
                }
            });
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
        setLoading(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearch(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const handleCreate = () => {
        router.push('/admin/users/create');
    };

    const handleUpdate = (id: number) => {
        router.push(`/admin/users/update/${id}`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>
                <div className="bg-white shadow rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Search by name"
                                className="input input-bordered"
                                value={search.name}
                                onChange={handleSearchChange}
                            />
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Search by phone number"
                                className="input input-bordered"
                                value={search.phone_number}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleCreate}>
                            Create User
                        </button>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{(page - 1) * 10 + index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone_number}</td>
                                            <td>
                                                <button className="btn btn-xs btn-warning mr-2" onClick={() => handleUpdate(user.id)}>
                                                    Update
                                                </button>
                                                <button className="btn btn-xs btn-error" onClick={() => handleDelete(user.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4">
                                <div className="btn-group">
                                    <button
                                        className={`btn ${page === 1 ? 'btn-disabled' : ''}`}
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    <button className="btn">{page}</button>
                                    <button
                                        className={`btn ${page === totalPages ? 'btn-disabled' : ''}`}
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListPage;
