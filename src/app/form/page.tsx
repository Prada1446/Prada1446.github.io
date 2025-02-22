"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function Form() {
  const { setUserData } = useAppContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState("Mahasiswa");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }

    setUserData((prev: any) => ({
      ...prev,
      name,
      gender,
      status,
    }));

    router.push("/camera");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Form Registrasi</h2>

      {/* Input Nama */}
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-64"
      />

      {/* Dropdown Jenis Kelamin */}
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border p-2 mb-2 w-64"
      >
        <option value="Male">Laki-laki</option>
        <option value="Female">Perempuan</option>
      </select>

      {/* Status (Radio Button) */}
      <div className="mb-4">
        <label className="block">
          <input
            type="radio"
            name="status"
            value="Mahasiswa"
            checked={status === "Mahasiswa"}
            onChange={() => setStatus("Mahasiswa")}
          />
          Mahasiswa
        </label>
        <label className="block">
          <input
            type="radio"
            name="status"
            value="Dosen/Pegawai"
            checked={status === "Dosen/Pegawai"}
            onChange={() => setStatus("Dosen/Pegawai")}
          />
          Dosen/Pegawai
        </label>
        <label className="block">
          <input
            type="radio"
            name="status"
            value="Umum"
            checked={status === "Umum"}
            onChange={() => setStatus("Umum")}
          />
          Umum
        </label>
      </div>

      {/* Tombol Lanjutkan */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Lanjutkan
      </button>
    </div>
  );
}
