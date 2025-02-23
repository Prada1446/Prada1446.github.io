"use client";

import { useRef, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import GenerateTime from "@/Component/generateTime";

const CameraPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { userData, setUserData } = useContext(AppContext);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const capture = () => {
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      setImage(imgSrc);
    }
  };

  const handleUserIdGenerated = (id: string) => {
    setUserId(id);
  };

  const uploadImage = async () => {
    if (!image || !userId) return; 

    setUploading(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyGp-MGhfHnQzrM2U6WL82C4yjIxI0wX-R8QXlJH6f6TfQIgxUTyxrGscR9Iv12uNLD/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            name: userData.name,
            gender: userData.gender,
            status: userData.status,
            lat: userData.lat,
            lon: userData.lon,
            image,
          }),
        }
      );

      console.log("Upload berhasil");

      // Simpan data ke Context API
      setUserData({
        ...userData,
        id: userId,
        timestamp: new Date().toISOString(),
        imageUrl: "URL TIDAK TERSEDIA PADA MODE NO-CORS",
      });

      setTimeout(() => {
        router.push("/qr");
      }, 1000);
    } catch (error) {
      console.error("❌ Upload gagal:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GenerateTime onUserIdGenerated={handleUserIdGenerated} />
      {!image ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/png" className="w-full h-auto rounded-md max-w-sm" />
          <button onClick={capture} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Ambil Foto
          </button>
        </>
      ) : (
        <>
          <img src={image} alt="Captured" className="w-full h-auto rounded-md max-w-sm" />
          <button
            onClick={uploadImage}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            disabled={uploading}
          >
            {uploading ? "Mengupload..." : "Kirim"}
          </button>
        </>
      )}
    </div>
  );
};

export default CameraPage;
