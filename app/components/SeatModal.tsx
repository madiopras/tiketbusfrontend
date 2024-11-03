import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface SeatModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: number;
  setSelectedSeats: (value: number) => void;
}

const SeatModal: React.FC<SeatModalProps> = ({ isOpen, onClose, selectedSeats, setSelectedSeats }) => {
  const maxSeats = 4;
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleSeatChange = (value: number) => {
    setSelectedSeats(value);
    onClose();
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:items-center z-50">
      <div
        className={`bg-white rounded-lg p-3 w-80 md:w-1/2 transform transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-full md:translate-y-0"
        } ${isOpen ? "absolute bottom-0 md:relative" : ""}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Pilih Jumlah Kursi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <IoClose className="text text-lg" />
          </button>
        </div>

        <div className="flex flex-col">
          {[...Array(maxSeats)].map((_, index) => {
            const seatCount = index + 1;
            return (
              <button
                key={seatCount}
                onClick={() => handleSeatChange(seatCount)}
                className={`py-2 px-4 mb-2 rounded ${
                  selectedSeats === seatCount ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {seatCount} Kursi
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeatModal;
