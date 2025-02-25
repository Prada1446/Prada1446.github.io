"use client";

import { useEffect, useRef, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

const QRPage = () => {
  const { userData } = useContext(AppContext);
  const qrRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const downloadQR = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current).then((canvas: { toDataURL: (arg0: string) => any; }) => {
        const imageUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = `QR-${userData.id}.png`;
        a.click();
      });
    }
  };

  useEffect(() => {
    if (!userData.id) {
      router.push("/");
    }
  }, [userData.id, router]);

  return (
    <div className="grid flex-col items-center justify-center min-h-screen content-center gap-4">
      <h1 className="text-xl font-bold">QR Code Anda</h1>
        <div ref={qrRef} id='QR' className="max-w-md bg-white p-4 rounded-md">
          <QRCodeCanvas 
              value={userData.id || "No Data"} 
              size={256} 
              minVersion={5}
              imageSettings={{
                src: `/Logo.png`,
                x: undefined,
                y: undefined,
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
