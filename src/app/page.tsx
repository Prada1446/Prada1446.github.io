"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserStorage from "@/models/UserStorage";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = UserStorage.getUser();
    if (user != null) {
      router.replace("/donation");
    } else {
      router.replace("/form");
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default HomePage;
