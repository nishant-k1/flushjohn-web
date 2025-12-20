"use client";

import React, { useRef, useEffect } from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    // Show error only after field is touched (blurred) and there's an error
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Only hide error if field is not touched yet
        // If field is touched and has error, keep showing it
        if (!touched) {
          setShowError(false);
        }
      }
    };

    if (showError) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showError, touched]);

  return (
    <div ref={containerRef} className={styles.inputWrapper} style={{ position: "relative" }}>
      <input
        {...field}
        {...props}
        type="text"
        className={
          touched && error
            ? `${styles.input} ${styles.error_field}`
            : styles.input
        }
        maxLength={5}
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter 5-digit zip code"
        title="Enter 5-digit zip code"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 5);
          setValue(value);
        }}
        onBlur={(e) => {
          field.onBlur(e); // Call Formik's onBlur to trigger validation
          setTouched(true);
        }}
      />
      <div className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}>
        {touched && error ? error : ""}
      </div>
    </div>
  );
};

export default MyZipTextField;
