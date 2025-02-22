"use client";

import { createContext, useState, useContext } from "react";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    status: "",
    lat: null,
    lon: null,
    id: "",
    timestamp: "",
    imageUrl: "",
  });

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
