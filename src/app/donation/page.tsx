"use client";

import { useRouter } from "next/navigation";

export default function DonationPage() {
    const router = useRouter();

    const handleSubmit = () => {
        router.replace("/qr");
    };

    return (
        <div className="grid w-[90%] m-auto gap-4 max-w-lg">
            <div className="pt-4">
                <h2 className="text-xl font-bold mb-4">Donasi Untuk Kegiatan ini</h2> 
                <p className="block text-sm/6 font-medium italic">Gunakan kode 62 di akhir nominal.<br />
                    Contoh donasi: Rp10.000<br />
                    Menjadi: Rp10.062
                </p>
            </div>
            <img src="/donation.jpg" alt="donasi" />
            <button 
                onClick={handleSubmit} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Lanjutkan
            </button>
        </div>
    );
}
