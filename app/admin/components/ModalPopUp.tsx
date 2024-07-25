import React from 'react';

interface ReusableModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ id, title, children, isOpen, onClose }) => {
  return (
    <dialog id={id} className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default ReusableModal;
