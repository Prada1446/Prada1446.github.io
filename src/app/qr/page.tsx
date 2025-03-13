"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import UserStorage from "@/models/UserStorage";
import UserData from "@/models/UserData";

const QRPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const user = UserStorage.getUser();
    if (user != null) {
      setUser(user);
    } else {
      router.replace("/form");
    }
  }, [router]);

  const downloadQR = async () => {
    if (!qrRef.current || !user) return;

    const canvas = await html2canvas(qrRef.current);
    const imageUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `QR-${user.id}.png`;
    a.click();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="grid flex-col items-center justify-center min-h-screen content-center gap-4">
      <h1 className="text-xl font-bold">QR Code Anda</h1>
      <p>Kamu berhasil mendaftar, silahkan tunjukkan QR berikut di meja registrasi masjid TULT mulai pukul 16.30 WIB</p>
      <div ref={qrRef} id="QR" className="max-w-md bg-white p-4 rounded-md">
        <QRCodeCanvas
          value={String(user.id)}
          size={256}
          minVersion={5}
          imageSettings={{
            src: `/Logo.png`,
            height: 40,
            width: 40,
            opacity: 1,
            excavate: true,
          }}
        />
      </div>
      <button
        onClick={downloadQR}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download QR
      </button>
    </div>
  );
};

export default QRPage;
