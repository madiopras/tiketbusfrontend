import { format } from 'date-fns';

export function TglOnly(tanggalString: string): string {
  const tanggal = new Date(tanggalString);
  return format(tanggal, 'dd MMMM yyyy'); 
}

