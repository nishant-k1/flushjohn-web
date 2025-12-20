"use client";

import React from "react";
import { useField } from "formik";
import styles from "./styles.module.css";

const ZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label} <span style={{ color: "#ff4444", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          {...props}
          type="text"
          className={`${styles.zipInput} ${touched && error ? styles.error_field : ""}`}
          autoComplete="postal-code"
          maxLength={5}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 5-digit zip code"
          title="Enter 5-digit zip code"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
            setValue(value);
          }}
        />
        <div className={`${styles.error} ${touched && error ? styles.errorVisible : styles.errorHidden}`}>
          {touched && error ? error : ""}
        </div>
      </div>
    </div>
  );
};

export default ZipTextField;
