import React from "react";
import CollapsibleCard from "../../components/CollapsibleCard";

export default function AdminSeatPage() {
  return (
    <CollapsibleCard title="Form Pilih Bangku Pemesanan" defaultChecked={true}>
      
        <form id="bookingForm" className="mx-auto max-w-md">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {/* Baris 1 */}
            <div className="seat bg-gray-300 text-center py-2" data-seat="1">1</div>
            <div className="seat aisle"></div>
            <div className="seat aisle"></div>
            <div className="driver-seat bg-yellow-500 text-white text-center py-2">Supir</div>
            {/* Baris 2 */}
            <div className="seat aisle"></div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="2">2</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="3">3</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="4">4</div>
            </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Baris 3 */}
            <div className="seat bg-gray-300 text-center py-2" data-seat="5">5</div>
            <div className="seat aisle"></div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="6">6</div>
            <div className="seat bg-gray-300 text-center py-2" data-seat="7">7</div>
          </div>
            
             
          
        </form>
    </CollapsibleCard>
  );
}
