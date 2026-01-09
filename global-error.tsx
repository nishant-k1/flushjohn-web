// global-error.tsx
"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // In production, this should send to a service like Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error tracking service
      // Sentry.captureException(error);
      // LogRocket.captureException(error);
      
      // For now, log to console in production (replace with actual service)
      console.error("Global application error:", {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        timestamp: new Date().toISOString(),
      });
    } else {
      // In development, log with full details
      console.error("Global application error:", {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        name: error.name,
        timestamp: new Date().toISOString(),
      });
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
