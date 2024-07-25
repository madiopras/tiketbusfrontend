import React from "react";
import CollapsibleCard from "../../components/CollapsibleCard";

export default function AdminSeatPage() {
  return (
    <CollapsibleCard title="Form Pilih Bangku Pemesanan" defaultChecked={true}>
      
        <form id="bookingForm" className="mx-auto max-w-md">
          <div className="grid grid-cols-5 gap-2">
            {/* Pintu depan */}
            <div className="door bg-red-500 text-white text-center py-2">Pintu</div>
            <div className="seat aisle"></div>
            <div className="seat aisle"></div>
            <div className="seat aisle"></div>
            <div className="driver-seat bg-yellow-500 text-white text-center py-2">Supir</div>
            {/* Baris 1 */}
            <div className="seat bg-gray-300 text-center py-2" data-seat="1A">1A</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="1B">1B</div>
            <div className="seat aisle"></div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="1C">1C</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="1D">1D</div>
            {/* Baris 2 */}
            <div className="seat bg-gray-300 text-center py-2" data-seat="2A">2A</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="2B">2B</div>
            <div className="seat aisle"></div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="2C">2C</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="2D">2D</div>
            {/* Baris 9 */}
            <div className="door bg-red-500 text-white text-center py-2">Pintu</div>
            <div className="seat aisle"></div>
            <div className="seat aisle"></div>
            <div className="seat aisle"></div>
            <div className="toilet bg-green-500 text-white text-center py-2">Toilet</div>
          </div>
        </form>
    </CollapsibleCard>
  );
}
