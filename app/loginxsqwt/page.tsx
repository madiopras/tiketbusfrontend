"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from '@/lib/axios';
import Cookies from 'js-cookie';
import logo from "../logo1.png";
import Image from "next/image";


const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get CSRF token from Laravel
      await axios.get('/sanctum/csrf-cookie');

      // Send login request
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 201) {
        Cookies.set('token', response.data.token, { expires: 1 }); // Set token cookie for 1 day
        router.push('/admin');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

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
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="form-control ">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "" : "Sign in"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link href="/admin/register" className="link link-primary">
              Dont have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
