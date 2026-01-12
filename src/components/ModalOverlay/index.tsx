"use client";

import React, { useEffect, useRef } from "react";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

const ModalOverlay = () => {
  const sidebarContext = useContext(SidebarContext);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!sidebarContext) {
    return null;
  }

  const { active, setActive } = sidebarContext;

  // Use direct event listeners as fallback
  useEffect(() => {
    if (!active || !overlayRef.current) {
      return;
    }

    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Only close if clicking directly on the overlay, not on children
      if (e.target === overlayRef.current) {
        setActive(false);
      }
    };

    const overlay = overlayRef.current;
    overlay.addEventListener("click", handleClick);
    overlay.addEventListener("touchend", handleClick);

    return () => {
      overlay.removeEventListener("click", handleClick);
      overlay.removeEventListener("touchend", handleClick);
    };
  }, [active, setActive]);

  if (!active) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      style={{
        height: "100vh",
        width: "100vw",
        background: "var(--black-alpha-50)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        pointerEvents: "auto",
        cursor: "pointer",
      }}
    />
  );
};

export default ModalOverlay;
