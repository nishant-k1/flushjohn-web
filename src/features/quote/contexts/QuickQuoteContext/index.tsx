"use client";

import React, { useContext } from "react";
import { QuoteContext } from "../QuoteContext";

export type QuickQuoteContextType = {
  quickQuoteViewStatus: boolean;
  setQuickQuoteViewStatus: React.Dispatch<React.SetStateAction<boolean>>;
  quickQuoteTitle: string;
  setQuickQuoteTitle: React.Dispatch<React.SetStateAction<string>>;
  quickQuoteRequested: boolean;
  setQuickQuoteRequested: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValue: QuickQuoteContextType = {
  quickQuoteViewStatus: false,
  setQuickQuoteViewStatus: () => {},
  quickQuoteTitle: "Quick Free Quote",
  setQuickQuoteTitle: () => {},
  quickQuoteRequested: false,
  setQuickQuoteRequested: () => {},
};

export const QuickQuoteContext =
  React.createContext<QuickQuoteContextType>(defaultContextValue);

export const QuickQuoteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { quoteRequested } = useContext(QuoteContext);

  const [quickQuoteViewStatus, setQuickQuoteViewStatus] =
    React.useState<boolean>(false);

  const [quickQuoteRequested, setQuickQuoteRequested] =
    React.useState<boolean>(false);

  const [quickQuoteTitle, setQuickQuoteTitle] =
    React.useState<string>("Quick Free Quote");

  const [exitTriggered, setExitTriggered] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        window.location.pathname === "/quote" ||
        window.location.pathname === "/"
      ) {
        return;
      }
      const timer = setTimeout(() => {
        setQuickQuoteViewStatus(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  React.useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (
        e.clientY < 10 &&
        !quickQuoteViewStatus &&
        !exitTriggered &&
        !quickQuoteRequested &&
        !quoteRequested &&
        window.location.pathname !== "/quote"
      ) {
        setQuickQuoteViewStatus(true);
        setQuickQuoteTitle("Get a Quote Before You Go!");
        setExitTriggered(true);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mouseleave", handleExitIntent);
    }

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [
    quickQuoteViewStatus,
    exitTriggered,
    quoteRequested,
    quickQuoteRequested,
  ]);

  React.useEffect(() => {
    if (quickQuoteViewStatus) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [quickQuoteViewStatus]);

  return (
    <QuickQuoteContext.Provider
      value={{
        quickQuoteViewStatus,
        setQuickQuoteViewStatus,
        quickQuoteTitle,
        setQuickQuoteTitle,
        quickQuoteRequested,
        setQuickQuoteRequested,
      }}
    >
      {children}
    </QuickQuoteContext.Provider>
  );
};
