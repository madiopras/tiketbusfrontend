import { toast } from 'react-toastify';

/**
 * Menampilkan toast sukses.
 * @param message Pesan sukses yang akan ditampilkan.
 */
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000, // Menampilkan toast selama 5 detik
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

/**
 * Menampilkan toast error.
 * @param message Pesan error yang akan ditampilkan.
 */
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000, // Menampilkan toast selama 5 detik
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
