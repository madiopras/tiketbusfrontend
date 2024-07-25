import React from 'react';

type ConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
    
    
    // Gunakan ref untuk mengakses elemen dialog
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    //if (!isOpen) return null;
     // Buka atau tutup dialog berdasarkan prop isOpen
     React.useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                </form>
                <h3 className="font-bold text-lg">Confirm</h3>
                <p className="py-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button className="btn btn-secondary" onClick={onClose}>
                        No
                    </button>
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Yes
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmModal;