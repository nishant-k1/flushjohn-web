"use client";

import { useField } from "formik";
import { ComponentType } from "react";
import dynamic from "next/dynamic";
import "./datepicker.css";
import styles from "./styles.module.css";

// Import CSS at module level (Next.js will handle it properly)
import "react-datepicker/dist/react-datepicker.css";

// Lazy load react-datepicker to reduce initial bundle size
const DatePicker = dynamic(
  () => import("react-datepicker") as Promise<{ default: ComponentType<any> }>,
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: "8px", minHeight: "40px", display: "flex", alignItems: "center" }}>
        Loading date picker...
      </div>
    ),
  }
);

const DateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;

  const parseStoredDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const selectedDate = parseStoredDate(field.value);

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        <span style={{ color: "red", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              const formatted = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              setValue(formatted);
            } else {
              setValue("");
            }
          }}
          onBlur={() => setTouched(true)}
          minDate={new Date()}
          dateFormat="MMM d, yyyy"
          placeholderText={props.placeholder || label}
          className={`full-form-datepicker ${styles.dateInput} ${props.className || ""} ${
            touched && error ? "error_field" : ""
          }`}
          popperPlacement="bottom-start"
          showPopperArrow={false}
        />
        {touched && error && <div className={styles.error}>{meta.error}</div>}
      </div>
    </div>
  );
};

export default DateField;
