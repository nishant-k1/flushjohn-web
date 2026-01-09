"use client";

import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("./index"), {
  ssr: false,
});

export default function ThemeSwitcherWrapper() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: 9999 
    }}>
      <ThemeSwitcher />
    </div>
  );
}
