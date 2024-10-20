import React from "react";
import ActionButton from "../components/ActionButton";
import { FormatRupiah, FormatTanggalWaktu } from "@/lib/utils";

interface DtlScheduleRute {
  route_name: string;
  route_id: number;
  sequence_route: number;
  departure_time: string;
  arrival_time: string;
  price_rute: number;
  description: string;
  is_active: boolean;
}

interface DtlScheduleRuteProps {
  dtlScheduleRutes: DtlScheduleRute[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const DtlScheduleRute: React.FC<DtlScheduleRuteProps> = ({
  dtlScheduleRutes,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs w-full mb-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>Rute</th>
            <th>Sequence</th>
            <th>Tanggal Berangkat</th>
            <th>Tanggal Sampai</th>
            <th>Harga</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dtlScheduleRutes.map((rute, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{rute.route_name}</td> {/* Menampilkan nama rute */}
              <td>{rute.sequence_route}</td>
              <td>{FormatTanggalWaktu(rute.departure_time)}</td> {/* Format waktu */}
              <td>{FormatTanggalWaktu(rute.arrival_time)}</td> {/* Format waktu */}
              <td>{FormatRupiah(rute.price_rute)}</td> 
              <td>
                <ActionButton variant="edit" onClick={() => onEdit(index)} />
                <ActionButton variant="delete" onClick={() => onDelete(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DtlScheduleRute;
