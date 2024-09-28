// components/BusTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';

interface Bus {
  id: number;
  bus_number: string;
  type_bus: string;
  bus_name: string;
  class_name: string;
  capacity: number;
}

interface BusTableProps {
  buses: Bus[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const BusTable: React.FC<BusTableProps> = ({
  buses,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);
  const [BusNameToDelete, setBusNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedBusId(id);
    setBusNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBusId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedBusId !== null) {
      confirmDelete(selectedBusId);
    }
    setIsModalOpen(false);
    setSelectedBusId(null);
  };

  return (
    <div className="overflow-x-auto bg-base-100 shadow-lg rounded-md p-4">
      <table className="table table-sm w-full mb-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Bus Number</th>
            <th>Nama Bus</th>
            <th>Jenis Bus</th>
            <th>Kelas</th>
            <th>Kursi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus, index) => (
            <tr key={bus.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{bus.bus_number}</td>
              <td>{bus.bus_name}</td>
              <td>{bus.type_bus}</td>
              <td>{bus.class_name}</td>
              <td>{bus.capacity}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(bus.id)} />
                <ActionButton variant="view" onClick={() => handleView(bus.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(bus.id, bus.bus_number)} /> 
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
        message={`Are you sure you want to delete ${BusNameToDelete}?`}
      />
    </div>
  );
};

export default BusTable;
