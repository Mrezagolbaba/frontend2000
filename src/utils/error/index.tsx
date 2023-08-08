import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  useEffect(() => {
    const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
      // Log the error or send it to your error monitoring service (e.g., Sentry).
      console.error(error);

      // You can also log the errorInfo to get more details about the error.
      console.error("Error Info:", errorInfo);
    };

    window.addEventListener("error", errorHandler as any);

    return () => {
      window.removeEventListener("error", errorHandler as any);
    };
  }, []);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ErrorBoundary;
