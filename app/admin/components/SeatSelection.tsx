"use client";

import { useState } from "react";
import PassengerForm from "./PassengerForm";


export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats: string[] = [
    "1A", "1B", "1C", "1D",
    "2A", "2B", "2C", "2D",
    "3A", "3B", "3C", "3D",
  ];

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      if (selectedSeats.length < 3) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert("Anda hanya dapat memilih maksimal 3 bangku.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Pilih Bangku Bus</h1>
      <div className="grid grid-cols-4 gap-4">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`btn ${
              selectedSeats.includes(seat) ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => toggleSeatSelection(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      <div className="w-full max-w-md">
        {selectedSeats.map((seat, index) => (
          <PassengerForm key={seat} seat={seat} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
