import React from "react";
import { useThemeColors } from "@/hooks/useTheme";

const ModalOverlay = () => {
  const colors = useThemeColors();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: colors.blackAlpha[50],
        position: "fixed",
      }}
    />
  );
};

export default ModalOverlay;
