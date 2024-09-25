"use client";

import React, { createContext, Dispatch, SetStateAction } from "react";

export type SidebarContextType = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const defaultContextValue: SidebarContextType = {
  active: false,
  setActive: () => {}, // No-op function
};

export const SidebarContext =
  createContext<SidebarContextType>(defaultContextValue);

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ active, setActive }}>
      {children}
    </SidebarContext.Provider>
  );
};
