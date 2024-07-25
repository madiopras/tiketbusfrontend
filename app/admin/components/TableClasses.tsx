// components/UserTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';

interface Classes {
  id: number;
  class_name: string;
  description: string;
}

interface ClassesTableProps {
  classes: Classes[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const ClassesTable: React.FC<ClassesTableProps> = ({
  classes,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassesId, setSelectedClassesId] = useState<number | null>(null);
  const [classesNameToDelete, setClassesNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedClassesId(id);
    setClassesNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClassesId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedClassesId !== null) {
      confirmDelete(selectedClassesId);
    }
    setIsModalOpen(false);
    setSelectedClassesId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Kelas</th>
            <th>Deskripsi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((kelas, index) => (
            <tr key={kelas.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{kelas.class_name}</td>
              <td>{kelas.description}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(kelas.id)} />
                <ActionButton variant="view" onClick={() => handleView(kelas.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(kelas.id, kelas.class_name)} /> 
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
        message={`Are you sure you want to delete ${classesNameToDelete}?`}
      />
    </div>
  );
};

export default ClassesTable;
