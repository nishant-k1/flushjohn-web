"use client";

import { useField } from "formik";
import { ComponentType, useState, useEffect, useRef } from "react";
import React from "react";
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
      <div
        style={{
          padding: "8px",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        Loading date picker...
      </div>
    ),
  }
);

const DateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const [showError, setShowError] = useState(false);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    // Show error only after field is touched (blurred) and there's an error
    // But don't show error if a date is selected (field has a value)
    if (touched && error && !field.value) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error, field.value]);

  const parseStoredDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const selectedDate = parseStoredDate(field.value);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      isSelectingRef.current = true;
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setValue(formatted);
      // Mark as touched when a date is selected
      setTouched(true);
      // Clear error state when date is selected
      setShowError(false);
      // Reset the flag after a short delay to allow calendar to close
      setTimeout(() => {
        isSelectingRef.current = false;
      }, 300);
    } else {
      setValue("");
    }
  };

  // Custom input component to prevent keyboard on mobile
  const CustomInput = React.forwardRef<
    HTMLInputElement,
    {
      value?: string;
      onClick?: () => void;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  >(({ value, onClick, onChange }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      // Don't open if we just selected a date
      if (isSelectingRef.current) {
        return;
      }
      // Let react-datepicker handle the click
      if (onClick) {
        onClick();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Don't open if we just selected a date
      if (isSelectingRef.current) {
        return;
      }
      // Prevent keyboard on mobile by setting inputmode and blurring after a delay
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.setAttribute("inputmode", "none");
        // Blur after a short delay to allow datepicker to open first
        setTimeout(() => {
          if (ref && typeof ref !== "function" && ref.current) {
            ref.current.blur();
          }
        }, 100);
      }
      if (onClick) {
        onClick();
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Mark as touched when input loses focus
      setTouched(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent keyboard from opening
      e.preventDefault();
    };

    return (
      <div style={{ position: "relative" }}>
        <input
          ref={ref}
          type="text"
          value={value || ""}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={onChange}
          placeholder={props.placeholder || label}
          inputMode="none"
          className={`full-form-datepicker ${styles.dateInput} ${props.className || ""} ${
            touched && error ? "error_field" : ""
          }`}
          style={{
            width: "100%",
            paddingRight: "32px",
            cursor: "pointer",
            caretColor: "transparent",
            userSelect: "none",
          }}
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
    );
  });

  CustomInput.displayName = "CustomInput";

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        <span style={{ color: "#ff4444", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMM d, yyyy"
          customInput={<CustomInput />}
          wrapperClassName="date-picker-wrapper"
          calendarClassName="date-picker-calendar"
          shouldCloseOnSelect={true}
          onCalendarClose={() => {
            // Mark as touched when calendar closes
            setTouched(true);
          }}
          popperPlacement="bottom-start"
          portalId="root"
          popperProps={{
            positionFixed: true,
            modifiers: [
              {
                name: "preventOverflow",
                options: {
                  boundary: "viewport",
                },
              },
              {
                name: "flip",
                options: {
                  fallbackPlacements: ["top", "bottom", "left", "right"],
                },
              },
            ],
          }}
        />
        <div
          className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
        >
          {touched && error ? "Required" : ""}
        </div>
      </div>
    </div>
  );
};

export default DateField;
