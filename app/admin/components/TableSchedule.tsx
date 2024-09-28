// components/ScheduleTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';
import {TglOnly} from '@/lib/utils'

interface Schedule {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  price_percentage: number;
  is_increase: boolean;
}

interface ScheduleTableProps {
  schedule: Schedule[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedule,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [nameToDelete, setNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedScheduleId(id);
    setNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedScheduleId !== null) {
      confirmDelete(selectedScheduleId);
    }
    setIsModalOpen(false);
    setSelectedScheduleId(null);
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
          {schedule.map((Schedule, index) => (
            <tr key={Schedule.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{Schedule.name}</td>
              <td>{TglOnly(Schedule.start_date)}</td> 
              <td>{TglOnly(Schedule.end_date)}</td>
              <td>{Schedule.price_percentage}</td>
              <td>{Schedule.is_increase ? "Markup" : "Diskon"}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(Schedule.id)} />
                <ActionButton variant="view" onClick={() => handleView(Schedule.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(Schedule.id, Schedule.name)} /> 
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

export default ScheduleTable;
