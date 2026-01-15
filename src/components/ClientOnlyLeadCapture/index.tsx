"use client";

import dynamic from "next/dynamic";

// Client-side only component for scroll detection
const LeadCaptureManager = dynamic(
  () => import("@/components/LeadCaptureManager"),
  {
    ssr: false,
  }
);

export default LeadCaptureManager;
