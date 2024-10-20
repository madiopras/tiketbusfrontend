// components/ScheduleTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';
import {HourOnly, TglOnly} from '@/lib/utils'

interface Schedule {
  id: number;
  name: string;
  departure_time: string;
  arrival_time: string;
  bus_number: string;
  bus_name: string;
  type_bus: string;
  class_name: string;
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
    <div className="overflow-x-auto bg-base-100 shadow-lg rounded-md p-4">
      <table className="table table-sm w-full mb-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Lokasi Schedule</th>
            <th>Tanggal Berangkat</th>
            <th>Jam</th>
            <th>No. Bus</th>
            <th>Nama Bus</th>
            <th>Type Bus</th>
            <th>Kelas Bus</th>
            <th>Action</th>
          </tr> 
        </thead>
        <tbody>
          {schedule.map((Schedule, index) => (
            <tr key={Schedule.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{Schedule.name}</td>
              <td>{TglOnly(Schedule.departure_time)}</td> 
              <td>{HourOnly(Schedule.departure_time)}</td>
              <td>{Schedule.bus_number}</td>
              <td>{Schedule.bus_name}</td>
              <td>{Schedule.type_bus}</td>
              <td>{Schedule.class_name}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(Schedule.id)} />
                <ActionButton variant="view" onClick={() => handleView(Schedule.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(Schedule.id, Schedule.departure_time)} /> 
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
