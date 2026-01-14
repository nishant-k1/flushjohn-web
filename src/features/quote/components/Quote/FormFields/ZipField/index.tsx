"use client";

import React, { useState, useEffect } from "react";
import { useField } from "formik";
import styles from "./styles.module.css";

const ZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  const errorId = `${props.name || 'zip'}-error`;
  const fieldId = props.id || props.name || `zip-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = touched && error;
  const errorMessage = typeof error === 'string' ? error : 'Required';

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel} htmlFor={fieldId}>
        {label} <span style={{ color: "var(--error-border)", fontSize: "x-large", display: "inline", lineHeight: 1, verticalAlign: "baseline" }} aria-label="required">*</span>
      </label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          {...props}
          id={fieldId}
          type="text"
          className={`${styles.zipInput} ${touched && error ? styles.error_field : ""}`}
          autoComplete="postal-code"
          maxLength={5}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 5-digit zip code"
          title="Enter 5-digit zip code"
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
            setValue(value);
          }}
          onFocus={() => {
            // Hide error when field is focused
            setShowError(false);
          }}
        />
        <div
          id={errorId}
          className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
          role="alert"
          aria-live="polite"
        >
          {touched && error ? errorMessage : ""}
        </div>
      </div>
    </div>
  );
};

export default ZipTextField;
