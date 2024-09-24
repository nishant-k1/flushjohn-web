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
  const [clientWidth, setClientWidth] = useState<number | null>(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  const handleResize = useCallback(() => {
    setClientWidth(window.innerWidth);
  }, []);

  // Add event listener for window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
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
