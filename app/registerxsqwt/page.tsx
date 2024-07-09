'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../logo1.png'; // Sesuaikan path logo jika perlu


const AdminRegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const is_admin = 0;
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, is_admin }),
        });

        setIsLoading(false);

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 relative">
            {error && (
                <div className="absolute top-4 right-4 alert alert-error shadow-lg w-80">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}
            <div className="card w-full max-w-sm shadow-xl bg-base-100">
                <div className="card-body">
                    <div className="flex justify-center mb-4">
                        <Image src={logo} alt="Logo" className="h-16 w-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-center">Admin Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="form-control">
                            <label htmlFor="name" className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email address</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? '' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <Link href="/loginxsqwt" className="link link-primary">
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterPage;
