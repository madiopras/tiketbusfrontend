"use client";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import ActionButtonForm from "@/app/admin/components/ActionButtonForm";
import Loading from "./loading";
import CollapsibleCard from "@/app/admin/components/CollapsibleCard";
import TextAreaForm from "@/app/admin/components/TextAreaForm";
import DateRangePicker from "@/app/admin/components/SelectDateRange";
import SelectSearchForm from "@/app/admin/components/SelectSearchForm";
import ActionButtonHeader from "@/app/admin/components/ActionButtonHeader";
import DtlScheduleRute from "@/app/admin/components/TableScheduleRute";
import RouteModal from "@/app/admin/components/ModalScheduleRute";
import InputForm from "@/app/admin/components/InputForm";

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

const UpdateSchedulePage = () => {
  const [schedules, setSchedules] = useState<Schedules>({
    location_id: 0,
    bus_id: 0,
    departure_time: "",
    arrival_time: "",
    description: "",
  });
  const [scheduleRutes, setScheduleRutes] = useState<ScheduleRute[]>([]);
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  const fetchSchedules = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/schedules/${id}`);
      setSchedules(response.data);
      setScheduleRutes(response.data.schedule_rutes || []);
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

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
      setScheduleRutes((prevState) => {
        const updatedRutes = [...prevState];
        updatedRutes[editIndex] = {
          ...newRute,
          route_name: newRute.route_name,
        };
        return updatedRutes;
      });
    } else {
      setScheduleRutes((prevState) => [
        ...prevState,
        { ...newRute, route_name: newRute.route_name },
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

  const handleSelectChange = (
    value: number,
    label: string,
    valueprice: number
  ) => {
    setNewRute((prevState) => ({
      ...prevState,
      route_id: value,
      route_name: label,
      price_rute: valueprice,
    }));
  };

  const handleSubmit = async (e: FormEvent) => { 
    e.preventDefault(); 
    setLoadingUpdate(true); 
    try { 
      const token = Cookies.get("token"); 
      await axios.put(`/api/admin/schedules/${id}`, { 
        ...schedules, 
        schedule_rutes: scheduleRutes, 
      }, { 
        headers: { 
          Authorization: `Bearer ${token}`, 
        }, 
      }); 
      router.push("/admin/schedule"); 
    } catch (error) { 
      console.error("Failed to update schedule", error); 
      alert("Failed to update schedule. Please try again."); 
    } 
    setLoadingUpdate(false); 
  };


  const handleCancel = () => {
    router.push("/admin/schedule");
  };

  const isActive = [
    { label: "Ya", value: true },
    { label: "Tidak", value: false },
  ];

  return (
    <>
    
    {loading ? (
        <Loading />
      ) : (
<form onSubmit={handleSubmit}>
<div className="bg-base-100 shadow-lg rounded-md p-4 mb-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DateRangePicker
            labelstart="Tanggal Mulai"
            labelend="Tanggal Selesai"
            required
            startDate={
              schedules.departure_time
                ? new Date(schedules.departure_time)
                : null
            }
            endDate={
              schedules.arrival_time ? new Date(schedules.arrival_time) : null
            }
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
            apiEndpoint="/api/admin/busses"
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
          <ActionButtonForm variant="update" isLoading={isLoading} />
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
        
      )}
    
    </>
    
  );
};

export default UpdateSchedulePage;
