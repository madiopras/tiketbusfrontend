// components/UserTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';

interface Locations {
  id: number;
  name: string;
  address: string;
}

interface LocationsTableProps {
  locations: Locations[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const LocationsTable: React.FC<LocationsTableProps> = ({
  locations,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedlocationsId, setSelectedlocationsId] = useState<number | null>(null);
  const [locationsNameToDelete, setlocationsNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedlocationsId(id);
    setlocationsNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedlocationsId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedlocationsId !== null) {
      confirmDelete(selectedlocationsId);
    }
    setIsModalOpen(false);
    setSelectedlocationsId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Lokasi</th>
            <th>Alamat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((kelas, index) => (
            <tr key={kelas.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{kelas.name}</td>
              <td>{kelas.address}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(kelas.id)} />
                <ActionButton variant="view" onClick={() => handleView(kelas.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(kelas.id, kelas.name)} /> 
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
        message={`Are you sure you want to delete ${locationsNameToDelete}?`}
      />
    </div>
  );
};

export default LocationsTable;
