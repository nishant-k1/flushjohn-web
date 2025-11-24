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

  const parseStoredDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const selectedDate = parseStoredDate(field.value);

  return (
    <div>
      <div style={{ position: "relative" }}>
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
          placeholderText={label}
          className={`custom-datepicker ${props.className || ""} ${
            touched && error ? "datepicker-error" : ""
          }`}
          popperPlacement="bottom-start"
          showPopperArrow={false}
        />
        <svg
          className="calendar-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            opacity: 0.6,
          }}
        >
          <path
            d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 10H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};

export default MyDateField;
