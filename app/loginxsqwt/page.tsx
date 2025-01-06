"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from '@/lib/axios';
import Cookies from 'js-cookie';
import logo from "../logo1.png";
import Image from "next/image";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const AdminLoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload
    setIsLoading(true);

    try {
      // Mendapatkan token CSRF dari Laravel
      await axios.get('/sanctum/csrf-cookie');
      
      // Mengirimkan permintaan login
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200 && response.data.token) {
        Cookies.set('token', response.data.token, { expires: 1 }); // Menyimpan token di cookie untuk 1 hari
        router.push('/admin');
        showSuccessToast("Login berhasil!");
      } else {
        showErrorToast("Respon login tidak valid.");
      }
    } catch (error: any) {
      // Menangani error dari respons
      if (error.response) {
        // Menangani kode error yang sudah diketahui
        if (error.response.status === 400) {
          showErrorToast("Permintaan tidak valid. Silakan periksa data Anda.");
        } else if (error.response.status === 500) {
          showErrorToast("Terjadi masalah di server. Silakan coba lagi nanti.");
        } else if (error.response.data && error.response.data.message) {
          showErrorToast(error.response.data.message); // Menampilkan pesan error dari API
        } else {
          showErrorToast("Terjadi kesalahan yang tidak terduga.");
        }
      } else {
        showErrorToast("Tidak dapat terhubung ke server. Silakan coba lagi.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative">
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
            <div className="form-control">
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
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link href="/admin/register" className="link link-primary">
              Tidak punya akun? Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
