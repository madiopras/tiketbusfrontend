import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah ada user yang sudah login saat komponen di-mount
    checkUser();

    // Bersihkan state user saat komponen di-unmount
    return () => setUser(null);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Permintaan CSRF token
      await api.get('/sanctum/csrf-cookie');

      // Permintaan login
      const response = await api.post('/login', { email, password });

      if (response.status === 200) {
        await checkUser(); // Periksa kembali status pengguna setelah login
        router.push('/admin/dashboard'); // Ganti halaman setelah login berhasil
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Tambahkan penanganan kesalahan sesuai kebutuhan
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout'); // Permintaan logout ke API
      setUser(null); // Bersihkan state user lokal
      router.push('/admin/login'); // Ganti halaman setelah logout berhasil
    } catch (error) {
      console.error('Logout failed:', error);
      // Tambahkan penanganan kesalahan sesuai kebutuhan
    }
  };

  const checkUser = async () => {
    try {
      const response = await api.get('/api/user'); // Permintaan informasi pengguna
      setUser(response.data); // Setel pengguna ke state lokal
    } catch (error) {
      console.error('User check failed:', error);
      setUser(null); // Jika gagal, bersihkan state pengguna
    }
  };

  return { user, login, logout };
};
