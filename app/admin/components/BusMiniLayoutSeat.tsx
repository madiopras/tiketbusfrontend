import React from 'react';

interface BusMiniLayoutSeatProps {
  seats: number[];
}

const BusMiniLayoutSeat: React.FC<BusMiniLayoutSeatProps> = ({ seats }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Baris 1 */}
        <div className="seat bg-gray-300 text-center py-2 rounded-tl-lg" data-seat={seats[0]}>1</div>
        <div className="seat aisle"></div>
        <div className="seat aisle"></div>
        <div className="driver-seat bg-yellow-500 text-white text-center py-2 rounded-tr-lg">Supir</div>
        {/* Baris 2 */}
        <div className="seat aisle"></div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[1]}>2</div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[2]}>3</div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[3]}>4</div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Baris 3 */}
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[4]}>5</div>
        <div className="seat aisle"></div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[5]}>6</div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[6]}>7</div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Baris 4 */}
        <div className="seat bg-gray-300 text-center py-2 rounded-bl-lg" data-seat={seats[7]}>8</div>
        <div className="seat aisle"></div>
        <div className="seat bg-gray-300 text-center py-2" data-seat={seats[8]}>9</div>
        <div className="seat bg-gray-300 text-center py-2 rounded-br-lg" data-seat={seats[9]}>10</div>
      </div>
    </>
  );
};

export default BusMiniLayoutSeat;
