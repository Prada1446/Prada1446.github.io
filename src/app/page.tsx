"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Home() {
  const router = useRouter();
  const { setUserData } = useContext(AppContext);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const allowedLat = -6.9760121;
        const allowedLon = 107.6322113;
        const radius = 50;

        const R = 6371;
        const dLat = (latitude - allowedLat) * (Math.PI / 180);
        const dLon = (longitude - allowedLon) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(allowedLat * (Math.PI / 180)) *
            Math.cos(latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance <= radius) {
          setUserData((prev: any) => ({
            ...prev,
            lat: latitude,
            lon: longitude,
          }));
          router.push("/form");
        } else {
          setError("Anda berada di luar radius yang diizinkan.");
        }
      },
      (err) => {
        console.error(err);
        setError("Izin lokasi ditolak atau terjadi kesalahan.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {error ? <p className="text-red-500">{error}</p> : <p>Memeriksa lokasi...</p>}
    </div>
  );
}
