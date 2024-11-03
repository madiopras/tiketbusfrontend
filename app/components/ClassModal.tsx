import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const classOptions = [
  "Ekonomi",
  "Bisnis",
  "Eksekutif",
];

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (classOption: string) => void;
}

const ClassModal: React.FC<ClassModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300); // Sesuaikan dengan durasi animasi
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:items-center z-50">
      <div
        className={`bg-white rounded-lg p-3 w-96 md:w-8/12 transform transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-full md:translate-y-0"
        } ${isOpen ? "absolute bottom-0 md:relative" : ""}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Pilih Kelas Bus</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            <IoClose className="text text-lg" />
          </button>
        </div>

        <ul className="max-h-72 overflow-y-auto">
          {classOptions.map((classOption, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => {
                onSelect(classOption);
                handleClose();
              }}
            >
              {classOption}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassModal;
