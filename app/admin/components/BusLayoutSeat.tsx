import React from 'react';

interface BusLayoutSeatProps {
  seats: number[];
}

const BusLayoutSeat: React.FC<BusLayoutSeatProps> = ({ seats }) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-2 mb-1">
        {/* Pintu depan */}
        <div className="door bg-red-500 text-white text-center py-2 rounded-tl-lg">Pintu</div>
        <div className="seat aisle"></div>
        <div className="seat aisle"></div>
        <div className="seat aisle"></div>
        <div className="driver-seat bg-yellow-500 text-white text-center py-2 rounded-tr-lg">Supir</div>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-1">
        {seats.map((seat, index) => (
          <React.Fragment key={index}>
            {index % 4 === 2 && <div className="seat aisle"></div>}
            <div className="seat bg-gray-300 text-center py-2 rounded-lg" data-seat={seat}>
              {seat}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 mb-1">
        <div className="door bg-red-500 text-white text-center py-2 rounded-bl-lg">Pintu</div>
        <div className="seat aisle"></div>
        <div className="seat aisle"></div>
        <div className="seat aisle"></div>
        <div className="toilet bg-green-500 text-white text-center py-2 rounded-br-lg">Toilet</div>
      </div>
    </>
  );
};

export default BusLayoutSeat;
