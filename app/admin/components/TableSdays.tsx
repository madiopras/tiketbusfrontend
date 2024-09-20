// components/SdaysTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';
import {TglOnly} from '@/lib/utils'

interface Sdays {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  price_percentage: number;
  is_increase: boolean;
}

interface SdaysTableProps {
  sdays: Sdays[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const SdaysTable: React.FC<SdaysTableProps> = ({
  sdays,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSdaysId, setSelectedSdaysId] = useState<number | null>(null);
  const [nameToDelete, setNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedSdaysId(id);
    setNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSdaysId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedSdaysId !== null) {
      confirmDelete(selectedSdaysId);
    }
    setIsModalOpen(false);
    setSelectedSdaysId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Special Days</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Persentase %</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sdays.map((Sdays, index) => (
            <tr key={Sdays.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{Sdays.name}</td>
              <td>{TglOnly(Sdays.start_date)}</td> 
              <td>{TglOnly(Sdays.end_date)}</td>
              <td>{Sdays.price_percentage}</td>
              <td>{Sdays.is_increase ? "Markup" : "Diskon"}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(Sdays.id)} />
                <ActionButton variant="view" onClick={() => handleView(Sdays.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(Sdays.id, Sdays.name)} /> 
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
        message={`Are you sure you want to delete ${nameToDelete} ?`}
      />
    </div>
  );
};

export default SdaysTable;
