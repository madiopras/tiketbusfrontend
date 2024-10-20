import { format } from 'date-fns';

export function TglOnly(tanggalString: string): string {
  const tanggal = new Date(tanggalString);
  return format(tanggal, 'dd MMMM yyyy'); 
}

export function HourOnly(tanggalString: string): string {
  const tanggal = new Date(tanggalString);
  return format(tanggal, 'hh:mm'); 
}

export function FormatTanggalWaktu(tanggalString: string): string {
  const tanggal = new Date(tanggalString);
  return tanggal.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).replace(',', ''); // Menghapus koma antara tanggal dan waktu
}

export function FormatRupiah(nilai: number): string {
  return nilai.toLocaleString('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  });
}

export function convertToIndonesianTime(utcDateString: string): string {
  const utcDate = new Date(utcDateString);

  // Convert to local time in Indonesia (WIB)
  const localDate = utcDate.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour12: false, // Use 24-hour format
  });

  // Format the date to match the API requirements (e.g., 'YYYY-MM-DD HH:mm:ss')
  const [datePart, timePart] = localDate.split(' ');
  const [day, month, year] = datePart.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}`;

  return formattedDate;
}
