import React, { ChangeEvent } from "react";
import SelectSearchForm from "../components/SelectSearchForm";
import DateRangePicker from "../components/SelectDateRange";
import InputForm from "../components/InputForm";
import TextAreaForm from "../components/TextAreaForm";

interface ScheduleRute {
  route_name: string;
  route_id: number;
  sequence_route: number;
  departure_time: string;
  arrival_time: string;
  price_rute: number;
  description: string;
  is_active: boolean;
}

interface RouteModalProps {
  isOpen: boolean;
  newRute: ScheduleRute;
  editIndex: number | null;
  onClose: () => void;
  onSave: () => void;
  onRuteChange: (value: number, label: string, price: number) => void; // Perubahan di sini
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const RouteModal: React.FC<RouteModalProps> = ({
  isOpen,
  newRute,
  editIndex,
  onClose,
  onSave,
  onRuteChange,
  onStartDateChange,
  onEndDateChange,
  onPriceChange,
  onDescriptionChange,
}) => {
  if (!isOpen) return null;

  // Konversi string tanggal ke objek Date jika diperlukan
  const departureDate = newRute.departure_time ? new Date(newRute.departure_time) : null;
  const arrivalDate = newRute.arrival_time ? new Date(newRute.arrival_time) : null;

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">
          {editIndex !== null ? "Edit Rute" : "Add Rute"}
        </h3>
        <SelectSearchForm
          label="Rute"
          name="route_id"
          value={newRute.route_id}
          onChange={(value, label, price) => onRuteChange(value, label, price)}
          apiEndpoint="/api/admin/routes"
          mapData={(data) => data.map((item: any) => ({
            label: `${item.start_location} - ${item.end_location}`,
            value: item.id,
            valueprice: item.price,
          }))}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateRangePicker
            labelstart="Tanggal Berangkat"
            labelend="Tanggal Sampai"
            required
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            startDate={departureDate} // Mengirim tanggal berangkat
            endDate={arrivalDate} // Mengirim tanggal sampai
          />
        </div>
        <InputForm
          label="Harga"
          variant="number"
          id="price_rute"
          name="price_rute"
          value={newRute.price_rute}
          onChange={onPriceChange}
        />
        <TextAreaForm
          label="Deskripsi Rute"
          name="description"
          value={newRute.description}
          onChange={onDescriptionChange}
          placeholder="Deskripsi Rute"
        />
        <div className="modal-action">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✖
          </button>
          <button className="btn btn-active btn-primary" type="button" onClick={onSave}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RouteModal;
