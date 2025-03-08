"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

// Define the type for the context
export type ClientWidthContextType = {
  clientWidth: number | null;
  setClientWidth: React.Dispatch<React.SetStateAction<number | null>>;
};

const defaultContextValue: ClientWidthContextType = {
  clientWidth: null,
  setClientWidth: () => {},
};

// Initialize the context with default values
export const ClientWidthContext =
  createContext<ClientWidthContextType>(defaultContextValue);

// Define the Provider component
export const ClientWidthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [clientWidth, setClientWidth] = useState<number | null>(null);

  const handleResize = useCallback(() => {
    setClientWidth(window.innerWidth);
  }, []);

  // Add event listener for window resize
  useEffect(() => {
    // Ensure this runs only on the client
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
