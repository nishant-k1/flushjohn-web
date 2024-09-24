import React from "react";
import { ClientWidthContext } from "../ClientWidthContext";
import { SidebarContext, SidebarContextType } from "../SidebarContext";
import { ClientWidthContextType } from "../ClientWidthContext";

export type QuickQuoteContextType = {
  quickQuoteViewStatus: boolean;
  setQuickQuoteViewStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValue: QuickQuoteContextType = {
  quickQuoteViewStatus: false,
  setQuickQuoteViewStatus: () => {}, // No-op function
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
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.style.overflowY =
      (quickQuoteViewStatus && clientWidth !== null && clientWidth <= 768) ||
      active
        ? "hidden"
        : "scroll";
  }, [quickQuoteViewStatus, clientWidth, active]);

  return (
    <QuickQuoteContext.Provider
      value={{ quickQuoteViewStatus, setQuickQuoteViewStatus }}
    >
      {children}
    </QuickQuoteContext.Provider>
  );
};
