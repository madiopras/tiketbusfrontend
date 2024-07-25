'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/lib/axios';
import CollapsibleCard from '@/app/admin/components/CollapsibleCard';
import InputForm from '@/app/admin/components/InputForm';
import ActionButtonForm from '@/app/admin/components/ActionButtonForm';
import Loading from './loading';

const ViewUserPage = () => {
    const [user, setUser] = useState({ name: '', email: '', phone_number: '', gender: '', role: '', is_active: true });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    const fetchUser = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/admin/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user', error);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleBack = () => {
        router.push('/admin/master/users');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4">
                {loading ? (
                    <Loading />
                ) : (
                    <CollapsibleCard title='View User' defaultChecked={true} >
                        <div className="grid grid-cols-3 gap-4">
                            <InputForm
                                label="Name"
                                variant="text"
                                id="name"
                                name="name"
                                value={user.name}
                                disabled={true}
                            />
                            <InputForm
                                label="Email"
                                variant="email"
                                id="email"
                                name="email"
                                value={user.email}
                                disabled={true}
                            />
                            <InputForm
                                label="Phone"
                                variant="text"
                                id="phone_number"
                                name="phone_number"
                                value={user.phone_number}
                                disabled={true}
                            />
                            <InputForm
                                label="Gender"
                                variant="text"
                                id="gender"
                                name="gender"
                                value={user.gender}
                                disabled={true}
                            />
                            <InputForm
                                label="Role"
                                variant="text"
                                id="role"
                                name="role"
                                value={user.role}
                                disabled={true}
                            />
                            <InputForm
                                label="Is Active"
                                variant="text"
                                id="is_active"
                                name="is_active"
                                value={user.is_active ? 'Active' : 'Inactive'}
                                disabled={true}
                            />
                            <div className="flex justify-end col-span-3">
                                <ActionButtonForm variant='back' onClick={handleBack} />
                            </div>
                        </div>
                    </CollapsibleCard>
                )}
            </div>
        </div>
    );
};

export default ViewUserPage;
