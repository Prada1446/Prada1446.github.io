"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserData from "@/models/UserData";
import UserStorage from "@/models/UserStorage";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Registration() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [customJob, setCustomJob] = useState<string>("");
  const [customAddress, setCustomAddress] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = UserStorage.getUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (field: keyof UserData, value: string | number) => {
    setUser((prev) => {
      if (!prev) return new UserData(0, "", "", "", 0, "");
      const updatedUser = new UserData(
        prev.id,
        prev.nama,
        prev.gender,
        prev.job,
        prev.noWhatsapp,
        prev.address
      );
      (updatedUser as any)[field] = value;
      return updatedUser;
    });
  };

  const handleCustomChange = (field: "job" | "address", value: string) => {
    if (field === "job") setCustomJob(value);
    if (field === "address") setCustomAddress(value);
  };

  const handleCustomBlur = (field: "job" | "address") => {
    handleChange(field, field === "job" ? customJob : customAddress);
  };

  const handleSubmit = async () => {
    if (!user?.nama || !user?.noWhatsapp || !user?.address) {
      alert("Semua field wajib diisi!");
      return;
    }

    setIsSubmitting(true);

    const userId = Date.now();
    const newUser = new UserData(
      userId,
      user.nama,
      user.gender || "Laki-laki",
      user.job,
      user.noWhatsapp,
      user.address
    );

    try {
      router.push("/qr");
      UserStorage.saveUser(newUser);
      
      await fetch("https://script.google.com/macros/s/AKfycbxvZcHBiqxFH8m2g7ckPy9w3xCIB9p6iCZSfX3BYHhnuaKo2Qr6YCJ5yLqMw2s69yY_1w/exec", {
        method: "POST",
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(newUser.toJSON()),
      });
      
      
    } catch (error) {
      console.error("❌ Upload gagal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid m-auto content-center p-10 min-w-3xs max-w-md min-h-screen gap-2">
      <h2 className="text-xl font-bold mb-4">Form Registrasi</h2>

      <div className="col-span-full w-lg">
        <label htmlFor="Nama" className="block text-sm/6 font-medium">
          Nama Lengkap
        </label>
        <input 
          id="Nama"
          type="text" 
          value={user?.nama || ""}
          placeholder="Masukkan Nama Lengkap"
          autoComplete="Name"
          onChange={(e) => handleChange("nama", e.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      <div className="col-span-full w-lg">
        <label htmlFor="NoWhatsapp" className="block text-sm/6 font-medium">
              Nomor Whatsapp
          </label>
        <input 
          id="NoWhatsapp"
          type="number"
          value={user?.noWhatsapp || ""}
          placeholder="Gunakan format awal 62"
          autoComplete="phone number"
          onChange={(e) => handleChange("noWhatsapp", Number(e.target.value))}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
        />
      </div>

      <div className="col-span-full min-w-md">
        <label htmlFor="gender" className="block text-sm/6 font-medium">
          Jenis Kelamin
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select 
            id="gender"
            value={user?.gender || "Laki-laki"} 
            onChange={(e) => handleChange("gender", e.target.value)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm/6 font-medium">Pekerjaan</legend>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-2">
            <input
              id="Mahasiswa" 
              type="radio" 
              name="job" 
              value="Mahasiswa" 
              checked={user?.job === "Mahasiswa"} 
              onChange={(e) => handleChange("job", e.target.value)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="Mahasiswa" className="block text-sm/6 font-medium">
              Mahasiswa TelU
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              id="Dosen/Pegawai" 
              type="radio" 
              name="job" 
              value="Dosen/Pegawai" 
              checked={user?.job === "Dosen/Pegawai"} 
              onChange={(e) => handleChange("job", e.target.value)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="Dosen/Pegawai" className="block text-sm/6 font-medium">
              Dosen/Pegawai TelU
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input 
              id="lainnya-job"
              type="radio" 
              name="job" 
              value="lainnya" 
              checked={user?.job === "lainnya"} 
              onChange={(e) => handleChange("job", e.target.value)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="lainnya-job" className="block text-sm/6 font-medium">
              Lainnya
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            {user?.job === "lainnya" && 
            <input 
              type="text" 
              value={customJob} 
              onChange={(e) => handleCustomChange("job", e.target.value)} 
              onBlur={() => handleCustomBlur("job")}
              placeholder="Masukkan Nama Pekerjaan"
              autoComplete="job"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="block text-sm/6 font-medium">Alamat</legend>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-2">
            <input 
              id="TelU"
              type="radio"
              name="address" 
              value="TelU" 
              checked={user?.address === "TelU"} 
              onChange={(e) => handleChange("address", e.target.value)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="TelU" className="block text-sm/6 font-medium">
              TelU
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              id="lainnya-address"
              type="radio" 
              name="address" 
              value="lainnya" 
              checked={user?.address === "lainnya"} 
              onChange={(e) => handleChange("address", e.target.value)}
              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="lainnya-address" className="block text-sm/6 font-medium">
              Lainnya
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            {user?.address === "lainnya" && 
            <input 
              type="text" 
              value={customAddress} 
              onChange={(e) => handleCustomChange("address", e.target.value)} 
              onBlur={() => handleCustomBlur("address")}
              placeholder="Masukkan Alamat Gunakan Nama Kecamatan"
              autoComplete="address"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />}           
          </div>
        </div>
      </fieldset>

      <button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Lanjutkan
      </button>
    </div>
  );
}
