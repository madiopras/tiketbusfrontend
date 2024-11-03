import React, { useState } from "react";
import DatePicker from "react-datepicker";
import LocationModal from "./LocationModal"; // Pastikan path benar
import SeatModal from "./SeatModal"; // Pastikan path benar
import ClassModal from "./ClassModal"; // Pastikan path benar
import { BsFillBusFrontFill } from "react-icons/bs";
import { TbBus } from "react-icons/tb";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import { FaSearchLocation } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css"; // Import stylesheet
import "@/app/datepickercustome.css";

interface TicketSearchFormProps {
  onSearch: (data: {
    fromLocation: string;
    toLocation: string;
    departureDate: Date | null;
    selectedSeats: number;
    selectedClass: string;
  }) => void;
}

const TicketSearchForm: React.FC<TicketSearchFormProps> = ({ onSearch }) => {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [today] = useState<Date>(new Date());
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<number>(1); // Default 1 kursi
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isToModalOpen, setIsToModalOpen] = useState<boolean>(false);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>(""); // Default tidak ada kelas
  const [isClassModalOpen, setIsClassModalOpen] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setDepartureDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      fromLocation,
      toLocation,
      departureDate,
      selectedSeats,
      selectedClass,
    });
  };

  return (
    <form
      className="glass shadow-md rounded-3xl px-8 pt-6 pb-1 mb-2 w-full"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {/* Berangkat Dari */}
        <div className="relative mb-2">
          <div
            className="input input-bordered w-full peer h-16 pl-8 pr-3 pt-6 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <BsFillBusFrontFill className="absolute left-2 top-7 text-gray-500 text-lg" />
            {fromLocation || "Pilih Kota/Terminal Asal"}
          </div>
          <label className="absolute left-2 top-1 text-gray-500 transform transition-all duration-200 scale-75 origin-top-left peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75">
            Dari
          </label>
        </div>

        {/* Tujuan */}
        <div className="relative mb-2">
          <div
            className="input input-bordered w-full peer h-16 pl-8 pr-3 pt-6 cursor-pointer"
            onClick={() => setIsToModalOpen(true)}
          >
            <TbBus className="absolute left-2 top-7 text-gray-500 text-lg" />
            {toLocation || "Pilih Kota/Terminal Tujuan"}
          </div>
          <label className="absolute left-2 top-1 text-gray-500 transform transition-all duration-200 scale-75 origin-top-left peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75">
            Ke
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        {/* Tanggal Berangkat */}
        <div className="relative mb-2">
          <DatePicker
            selected={departureDate}
            withPortal
            showIcon
            isClearable
            onChange={handleDateChange}
            minDate={today}
            dateFormat="dd MMMM yyyy"
            className="input input-bordered w-full peer h-16 pr-3 pt-6" // Padding kiri untuk memberi ruang bagi ikon
            placeholderText="cth: 11 January 2024"
          />

          <label className="absolute left-2 top-1 text-gray-500 transform transition-all duration-200 scale-75 origin-top-left peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75">
            Tanggal Pergi
          </label>
        </div>

        {/* Jumlah Kursi */}
        <div className="relative mb-2">
          <div
            className="input input-bordered w-full peer h-16 pl-8 pr-3 pt-6 cursor-pointer"
            onClick={() => setIsSeatModalOpen(true)}
          >
            <MdAirlineSeatReclineExtra className="absolute left-2 top-7 text-gray-500 text-lg" />
            {selectedSeats} Kursi
          </div>
          <label className="absolute left-2 top-1 text-gray-500 transform transition-all duration-200 scale-75 origin-top-left peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75">
            Jumlah Kursi
          </label>
        </div>

        {/* Kelas Bus */}
        <div className="relative mb-2">
          <div
            className="input input-bordered w-full peer h-16 pl-8 pr-3 pt-6 cursor-pointer"
            onClick={() => setIsClassModalOpen(true)}
          >
            <PiSeatFill className="absolute left-2 top-7 text-gray-500 text-lg" />
            {selectedClass || "Pilih Kelas Bus"}
          </div>
          <label className="absolute left-2 top-1 text-gray-500 transform transition-all duration-200 scale-75 origin-top-left peer-focus:top-2 peer-focus:left-3 peer-focus:scale-75">
            Kelas Bus
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary rounded-3xl w-full h-12"
          >
            <FaSearchLocation className="mr-2" />
            Cari Tiket
          </button>
        </div>
      </div>

      {/* Modal untuk Berangkat Dari */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(location) => setFromLocation(location)}
      />

      {/* Modal untuk Tujuan */}
      <LocationModal
        isOpen={isToModalOpen}
        onClose={() => setIsToModalOpen(false)}
        onSelect={(location) => setToLocation(location)}
      />

      {/* Modal untuk Jumlah Kursi */}
      <SeatModal
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      {/* Modal untuk Kelas Bus */}
      <ClassModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSelect={(classOption) => setSelectedClass(classOption)}
      />
    </form>
  );
};

export default TicketSearchForm;
