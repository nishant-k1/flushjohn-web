"use client";

import React from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

const ModalOverlay = () => {
  const sidebarContext = useContext(SidebarContext);

  if (!sidebarContext) {
    return null;
  }

  const { active, setActive } = sidebarContext;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (active) {
      setActive(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (active) {
      setActive(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      style={{
        height: "100vh",
        width: "100vw",
        background: "var(--black-alpha-50)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 200,
      }}
    />
  );
};

export default ModalOverlay;
