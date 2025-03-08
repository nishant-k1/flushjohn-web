"use client";

import React from "react";
import { ClientWidthContext } from "../ClientWidthContext";
import { SidebarContext, SidebarContextType } from "../SidebarContext";
import { ClientWidthContextType } from "../ClientWidthContext";

export type QuickQuoteContextType = {
  quickQuoteViewStatus: boolean;
  setQuickQuoteViewStatus: React.Dispatch<React.SetStateAction<boolean>>;
  quickQuoteTitle: string;
};

const defaultContextValue: QuickQuoteContextType = {
  quickQuoteViewStatus: false,
  setQuickQuoteViewStatus: () => {},
  quickQuoteTitle: "Quick Quote",
};

export const QuickQuoteContext =
  React.createContext<QuickQuoteContextType>(defaultContextValue);

export const QuickQuoteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quickQuoteViewStatus, setQuickQuoteViewStatus] =
    React.useState<boolean>(false);

  const [quickQuoteTitle, setQuickQuoteTitle] =
    React.useState<string>("Quick Quote");

  const [exitTriggered, setExitTriggered] = React.useState<boolean>(false);

  const { clientWidth } =
    React.useContext<ClientWidthContextType>(ClientWidthContext);
  const { active } = React.useContext<SidebarContextType>(SidebarContext);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/quote"
    ) {
      const timer = setTimeout(() => {
        setQuickQuoteViewStatus(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Exit-intent trigger
  React.useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY < 10 && !quickQuoteViewStatus && !exitTriggered) {
        setQuickQuoteViewStatus(true);
        setQuickQuoteTitle("Wait! Get an instant quote before you go!");
        setExitTriggered(true); // Prevent multiple triggers
      }
      return () => {
        setQuickQuoteTitle("Quick Quote");
      };
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mouseleave", handleExitIntent);
    }

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [quickQuoteViewStatus, exitTriggered]);

  React.useEffect(() => {
    document.documentElement.style.overflowY =
      (quickQuoteViewStatus && clientWidth !== null && clientWidth <= 768) ||
      active
        ? "hidden"
        : "scroll";
  }, [quickQuoteViewStatus, clientWidth, active]);

  return (
    <QuickQuoteContext.Provider
      value={{ quickQuoteViewStatus, setQuickQuoteViewStatus, quickQuoteTitle }}
    >
      {children}
    </QuickQuoteContext.Provider>
  );
};
