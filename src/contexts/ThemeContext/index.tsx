import React from "react";

export const ThemeContext = React.createContext(undefined);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={undefined}>{children}</ThemeContext.Provider>
  );
};
