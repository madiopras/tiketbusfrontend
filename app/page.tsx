"use client";
import React, { useState } from "react";
import TicketSearchForm from "./components/TicketSearchForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const HomePage: React.FC = () => {
  const handleSearch = (data: {
    fromLocation: string;
    toLocation: string;
    departureDate: Date | null;
    selectedSeats: number;
    selectedClass: string;
  }) => {
    console.log("Searching tickets with data:", data);
    // Tambahkan logika pencarian tiket di sini
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-300 mt-16">
      <Navbar />
      <div className="w-svw -mt-20 pt-20" style={{backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",}}>
      <div className="p-4">
      <TicketSearchForm onSearch={handleSearch} />
      </div>
      
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Pemesanan Tiket Bus</h1>
      
      <Footer />
    </div>
  );
};

export default HomePage;
