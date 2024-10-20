"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import DateRangePicker from "@/app/admin/components/SelectDateRange";
import SelectSearchForm from "../../components/SelectSearchForm";
import ActionButtonHeader from "../../components/ActionButtonHeader";
import DtlScheduleRute from "../../components/TableScheduleRute";
import RouteModal from "../../components/ModalScheduleRute";
import { convertToIndonesianTime } from "@/lib/utils";
interface Schedules {
  location_id: number;
  bus_id: number;
  departure_time: string;
  arrival_time: string;
  description: string;
}
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

interface LocationItem {
  id: number;
  name: string;
}
interface BusItem {
  id: number;
  bus_number: string;
}

// Fungsi untuk memetakan data lokasi
const mapLocationData = (data: any) => {
  return data.map((item: LocationItem) => ({
    label: item.name,
    value: item.id,
  }));
};
// Fungsi untuk memetakan data bus
const mapBusData = (data: any) => {
  return data.map((item: BusItem) => ({
    label: item.bus_number,
    value: item.id,
  }));
};

const CreateSchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedules>({
    location_id: 0,
    bus_id: 0,
    departure_time: "",
    arrival_time: "",
    description: "",
  });
  const [scheduleRutes, setScheduleRutes] = useState<ScheduleRute[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [newRute, setNewRute] = useState<ScheduleRute>({
    route_id: 0,
    route_name: "",
    sequence_route: 0,
    departure_time: "",
    arrival_time: "",
    price_rute: 0,
    description: "",
    is_active: true,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState(
    `/api/admin/busses?dateTime=${encodeURIComponent(schedules.departure_time)}`
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSchedules((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setSchedules((prevState) => ({
        ...prevState,
        departure_time: date.toISOString(),
      }));
      const localDepartureTime = convertToIndonesianTime(date.toISOString());
      setApiEndpoint(`/api/admin/busses?dateTime=${encodeURIComponent(localDepartureTime)}`);
    }
  };

  
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setSchedules((prevState) => ({
        ...prevState,
        arrival_time: date.toISOString(),
      }));
    }
  };
  
  const handleStartDateRuteChange = (date: Date | null) => {
    if (date) {
      setNewRute((prevState) => ({
        ...prevState,
        departure_time: date.toISOString(),
      }));
    }
  };
  const handleEndDateRuteChange = (date: Date | null) => {
    if (date) {
      setNewRute((prevState) => ({
        ...prevState,
        arrival_time: date.toISOString(),
      }));
    }
  };

  
  const resetNewRute = () => {
    setNewRute({
      route_id: 0,
      route_name: "",
      sequence_route: 0,
      departure_time: "",
      arrival_time: "",
      price_rute: 0,
      description: "",
      is_active: true,
    });
    setEditIndex(null);
  };

  const handleAddRute = () => {
    if (editIndex !== null) {
      // Edit existing rute
      setScheduleRutes((prevState) => {
        const updatedRutes = [...prevState];
        updatedRutes[editIndex] = {
          ...newRute,
          route_name: newRute.route_name, // Gunakan route_name dari state
        };
        return updatedRutes;
      });
    } else {
      // Add new rute
      setScheduleRutes((prevState) => [
        ...prevState,
        {
          ...newRute,
          route_name: newRute.route_name, // Gunakan route_name dari state
        },
      ]);
    }
    resetNewRute();
    setModalOpen(false);
  };

  const handleEditRute = (index: number) => {
    setEditIndex(index);
    setNewRute(scheduleRutes[index]);
    setModalOpen(true);
  };
  const handleDeleteRute = (index: number) => {
    setScheduleRutes((prevState) =>
      prevState.filter((_, ruteIndex) => ruteIndex !== index)
    );
  };

  const handleSelectChange = (value: number, label: string, valueprice: number) => {
    setNewRute((prevState) => ({
      ...prevState,
      route_id: value,
      route_name: label,
      price_rute: valueprice,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const create_by_id = Cookies.get("token");
      await axios.post("/api/admin/schedules", {
        ...schedules,
        schedule_rutes: scheduleRutes,
        create_by_id,
      });
      router.push("/admin/schedule");
    } catch (error) {
      console.error("Failed to create schedule", error);
      alert("Gagal membuat jadwal. Silakan coba lagi.");
    }
    setLoading(false);
  };


  const handleCancel = () => {
    router.push("/admin/schedule");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-base-100 shadow-lg rounded-md p-4 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateRangePicker
            labelstart="Tanggal Mulai"
            labelend="Tanggal Selesai"
            required
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectSearchForm
            label="Lokasi Schedule"
            name="location_id"
            value={schedules.location_id}
            onChange={(value) =>
              setSchedules((prevState) => ({
                ...prevState,
                location_id: value,
              }))
            }
            apiEndpoint="/api/admin/locations"
            mapData={mapLocationData}
            required
          />
          <SelectSearchForm
            label="Bus"
            name="bus_id"
            value={schedules.bus_id}
            onChange={(value) =>
              setSchedules((prevState) => ({ ...prevState, bus_id: value }))
            }
            apiEndpoint={apiEndpoint}
            mapData={mapBusData}
            required
          />
        </div>
        </div>
      <div className="bg-base-100 shadow-lg rounded-md p-4">
        <div className="flex justify-start space-x-4 mb-2">
          <ActionButtonHeader
            variant="add"
            onClick={() => {
              resetNewRute();
              setModalOpen(true);
            }}
          />
        </div>
        <DtlScheduleRute 
        dtlScheduleRutes={scheduleRutes}
        onEdit={handleEditRute}
        onDelete={handleDeleteRute}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextAreaForm
            label="Description"
            name="description"
            value={schedules.description}
            onChange={handleChange}
            placeholder="Deskripsi Schedule"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <ActionButtonForm variant="cancel" onClick={handleCancel} />
          <ActionButtonForm variant="submit" isLoading={isLoading} />
        </div>
      </div>
      {/* Modal for adding/editing routes */}
      <RouteModal
        isOpen={isModalOpen}
        newRute={newRute}
        editIndex={editIndex}
        onClose={() => setModalOpen(false)}
        onSave={handleAddRute}
        onRuteChange={handleSelectChange}
        onStartDateChange={handleStartDateRuteChange}
        onEndDateChange={handleEndDateRuteChange}
        onPriceChange={(e) =>
          setNewRute({ ...newRute, price_rute: Number(e.target.value) })
        }
        onDescriptionChange={(e) =>
          setNewRute({ ...newRute, description: e.target.value })
        }
      />
    </form>
  );
};

export default CreateSchedulePage;
