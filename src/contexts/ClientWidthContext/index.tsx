"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

export type ClientWidthContextType = {
  clientWidth: number | null;
  setClientWidth: React.Dispatch<React.SetStateAction<number | null>>;
};

const defaultContextValue: ClientWidthContextType = {
  clientWidth: null,
  setClientWidth: () => {},
};

export const ClientWidthContext =
  createContext<ClientWidthContextType>(defaultContextValue);

export const ClientWidthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clientWidth, setClientWidth] = useState<number | null>(null);

  const handleResize = useCallback(() => {
    setClientWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClientWidth(window.innerWidth); // Set initial width
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  return (
    <ClientWidthContext.Provider value={{ clientWidth, setClientWidth }}>
      {children}
    </ClientWidthContext.Provider>
  );
};
