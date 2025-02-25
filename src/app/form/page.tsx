"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Registration() {
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
    <div className="grid m-auto content-center p-10 min-w-3xs max-w-md min-h-screen gap-2">

      <h2 className="text-xl font-bold mb-4">Form Registrasi</h2>

      <div className="col-span-full w-lg">
          <label htmlFor="street-address" className="block text-sm/6 font-medium">
              Nama Lengkap
          </label>
          <div className="mt-2">
          <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  placeholder="Nama"
                  autoComplete="street-address"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
           </div>
      </div>

      <div className="col-span-full min-w-md">
              <label htmlFor="gender" className="block text-sm/6 font-medium">
                Jenis Kelamin
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
        </div>

        <fieldset>
              <legend className="text-sm/6 font-semibold">Status</legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-x-2">
                  <input
                    id="Mahasiswa"
                    type="radio"
                    name="status"
                    value="Mahasiswa"
                    checked={status === "Mahasiswa"}
                    onChange={() => setStatus("Mahasiswa")}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label htmlFor="Mahasiswa" className="block text-sm/6 font-medium">
                      Mahasiswa
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    id="Dosen/Pegawai"
                    type="radio"
                    name="status"
                    value="Dosen/Pegawai"
                    checked={status === "Dosen/Pegawai"}
                    onChange={() => setStatus("Dosen/Pegawai")}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label htmlFor="Dosen/Pegawai" className="block text-sm/6 font-medium">
                    Dosen/Pegawai
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    id="Umum"
                    type="radio"
                    name="status"
                    value="Umum"
                    checked={status === "Umum"}
                    onChange={() => setStatus("Umum")}
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label htmlFor="Umum" className="block text-sm/6 font-medium">
                    Umum
                  </label>
                </div>
              </div>
            </fieldset>

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
