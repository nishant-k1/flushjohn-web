"use client";

import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyDateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;

  // Parse the stored date value (either formatted string or Date object)
  const parseStoredDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    // Try to parse formatted string like "January 15, 2025"
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const selectedDate = parseStoredDate(field.value);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) {
            // Store formatted date
            const formatted = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            setValue(formatted);
          } else {
            setValue("");
          }
        }}
        onBlur={() => setTouched(true)}
        minDate={new Date()}
        dateFormat="MMMM d, yyyy"
        placeholderText={label}
        className={`custom-datepicker ${props.className || ""} ${
          touched && error ? styles.error_field : ""
        }`}
        popperPlacement="bottom-start"
        showPopperArrow={false}
      />
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};

export default MyDateField;
