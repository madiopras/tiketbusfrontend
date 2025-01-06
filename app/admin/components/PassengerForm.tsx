"use client";

import { useState } from "react";

interface PassengerFormProps {
  seat: string;
  index: number;
}

export default function PassengerForm({ seat, index }: PassengerFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
      <input
        type="checkbox"
        className="peer"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="collapse-title text-lg font-medium">
        Penumpang {index} - Bangku {seat}
      </div>
      <div className="collapse-content">
        <form>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Nama Penumpang</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Jenis Kelamin</span>
            </label>
            <select className="select select-bordered">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Nomor Telepon</span>
            </label>
            <input
              type="tel"
              placeholder="Masukkan nomor telepon"
              className="input input-bordered"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
