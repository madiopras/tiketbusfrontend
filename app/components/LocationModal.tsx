import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const locations = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Bali",
  "Malang",
  "Semarang",
  "Palembang",
  "Makassar",
  "Padang",
  "Pekanbaru",
  // Tambahkan lokasi lainnya sesuai kebutuhan
];

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  // Filter lokasi berdasarkan input pencarian
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:items-center z-50">
      <div
        className={`bg-white rounded-lg p-3 w-96 md:w-8/12 transform transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-full md:translate-y-0"
        } ${isOpen ? "absolute bottom-0 md:relative" : ""}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Pilih Lokasi</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <IoClose className="text text-lg" />
          </button>
        </div>

        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Ketik nama kota, terminal, atau titik lainnya"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />

        <ul className="max-h-72 overflow-y-auto">
          {filteredLocations.slice(0, 10).map((location, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => {
                onSelect(location);
                onClose();
              }}
            >
              {location}
              <ul>
                <li className="text-gray-500 text-xs">
                  Semua Terminal / Titik Keberangkatan di {location}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationModal;
