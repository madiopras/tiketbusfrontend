// components/UserTable.tsx
import React, { useState } from 'react';
import ActionButton from './ActionButton';
import Pagination from './Pagination';
import ConfirmModal from './ConfirmModal';

interface User {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone_number: string;
}

interface UserTableProps {
  users: User[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void; // Mengganti handleDelete dengan confirmDelete
  handlePageChange: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  totalPages,
  totalItems, 
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userNameToDelete, setUserNameToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedUserId(id);
    setUserNameToDelete(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      confirmDelete(selectedUserId);
    }
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="overflow-x-auto bg-base-100 shadow-lg rounded-md p-4">
      <table className="table table-sm w-full mb-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="hover">
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <ActionButton variant="edit" onClick={() => handleUpdate(user.id)} />
                <ActionButton variant="view" onClick={() => handleView(user.id)} />
                <ActionButton variant="delete" onClick={() => handleDeleteClick(user.id, user.name)} /> 
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
        message={`Are you sure you want to delete ${userNameToDelete}?`}
      />
    </div>
  );
};

export default UserTable;
