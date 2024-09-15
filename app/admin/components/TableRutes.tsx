// components/RutesTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';

interface Rute {
  id: number;
  start_location: string;
  end_location: string;
  distance: string;
  price: number;
}

interface RutesTableProps {
  rutes: Rute[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const RutesTable: React.FC<RutesTableProps> = ({
  rutes,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRuteId, setSelectedRuteId] = useState<number | null>(null);
  const [RuteAsalToDelete, setRuteAsalToDelete] = useState<string | null>(null);
  const [RuteTujuanToDelete, setRuteTujuanToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, asal: string, tujuan: string) => {
    setSelectedRuteId(id);
    setRuteAsalToDelete(asal);
    setRuteTujuanToDelete(tujuan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRuteId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRuteId !== null) {
      confirmDelete(selectedRuteId);
    }
    setIsModalOpen(false);
    setSelectedRuteId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Asal</th>
            <th>Tujuan</th>
            <th>Jarak</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rutes.map((rute, index) => (
            <tr key={rute.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{rute.start_location}</td>
              <td>{rute.end_location}</td>
              <td>{rute.distance}</td>
              <td>{rute.price}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(rute.id)} />
                <ActionButton variant="view" onClick={() => handleView(rute.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(rute.id, rute.start_location, rute.end_location)} /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} totalItems={totalItems} handlePageChange={handlePageChange} />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${RuteAsalToDelete} - ${RuteTujuanToDelete} ?`}
      />
    </div>
  );
};

export default RutesTable;
