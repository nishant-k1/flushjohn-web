"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div
      style={{
        padding: "var(--spacing-section) var(--spacing-lg)",
        backgroundColor: "var(--bg-primary)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-lg)",
      }}
    >
      <h2 style={{ color: "var(--text-primary)", fontSize: "2rem", margin: 0 }}>
        Something went wrong!
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          margin: 0,
        }}
      >
        {error.message}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "var(--spacing-md) var(--spacing-xl)",
          backgroundColor: "var(--primary)",
          color: "var(--text-primary)",
          border: "2px solid var(--primary)",
          borderRadius: "0",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all var(--transition-base)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--primary-light)";
          e.currentTarget.style.borderColor = "var(--primary-light)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--primary)";
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.backgroundColor = "var(--primary-dark)";
          e.currentTarget.style.borderColor = "var(--primary-dark)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.backgroundColor = "var(--primary-light)";
          e.currentTarget.style.borderColor = "var(--primary-light)";
        }}
      >
        Try again
      </button>
    </div>
  );
}
