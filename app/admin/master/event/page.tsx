'use client'
import React, { useState, useEffect, useCallback } from 'react';
import axios from "@/lib/axios";
import Select from 'react-select';

interface LocationItem {
  id: number;
  name: string;
}

const AdminEventPage = () => {
  const [search, setSearch] = useState({ name: "" });
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<{ [key: string]: { label: string; value: number }[] }>({});

  const fetchLocations = useCallback(async (searchTerm: string) => {
    if (cache[searchTerm]) {
      setOptions(cache[searchTerm]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<{ data: LocationItem[] }>("/api/admin/locations", {
        params: {
          name: searchTerm,
          limit: 10,
        },
      });
      const formattedOptions = response.data.data.map(suggestion => ({
        value: suggestion.id,
        label: suggestion.name,
      }));
      setOptions(formattedOptions);
      setCache(prevCache => ({ ...prevCache, [searchTerm]: formattedOptions }));
    } catch (error) {
      console.error("Gagal mengambil lokasi", error);
    }
    setLoading(false);
  }, [cache]);

  const fetchDefaultLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: LocationItem[] }>("/api/admin/locations", {
        params: {
          limit: 10, // Ambil maksimal 10 lokasi default
        },
      });
      const formattedOptions = response.data.data.map(suggestion => ({
        value: suggestion.id,
        label: suggestion.name,
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Gagal mengambil lokasi default", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.name) {
        fetchLocations(search.name);
      } else {
        fetchDefaultLocations();
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [search.name, fetchLocations]);

  const handleInputChange = (inputValue: string) => {
    setSearch({ name: inputValue });
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      setSearch({ name: selectedOption.label }); // Mengatur nama lokasi yang dipilih
    } else {
      setSearch({ name: '' }); // Reset pencarian jika tidak ada pilihan
    }
  };
  
  return (
    <div className="w-full max-w-xs mx-auto">
      <Select
        options={options}
        onInputChange={handleInputChange} // Menggunakan handleInputChange
        onChange={handleChange}
        placeholder="Cari Lokasi"
        isClearable
        isLoading = {loading}
      />
    </div>
  );
};

export default AdminEventPage;
