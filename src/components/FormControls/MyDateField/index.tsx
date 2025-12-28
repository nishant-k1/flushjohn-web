"use client";

import React, { ComponentType, useRef, useEffect, useState } from "react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import "./datepicker.css";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

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

const MyDateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  // Parse the date value
  const parseDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    // Try to parse the formatted date string (e.g., "Jan 15, 2024")
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    return null;
  };

  const selectedDate = parseDate(field.value);

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
      // Don't prevent default - let react-datepicker handle the click
      if (onClick) {
        onClick();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      // Don't open if we just selected a date
      if (isSelectingRef.current) {
        return;
      }
      // Prevent keyboard on mobile by blurring immediately
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.setAttribute("inputmode", "none");
        // Blur immediately to prevent keyboard
        setTimeout(() => {
          if (ref && typeof ref !== "function" && ref.current) {
            ref.current.blur();
          }
        }, 0);
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
          placeholder={label}
          inputMode="none"
          className={`custom-datepicker ${props.className || ""} ${
            touched && error ? "datepicker-error" : ""
          }`}
          style={{
            width: "100%",
            paddingRight: "32px",
            cursor: "pointer",
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
    <div style={{ position: "relative" }}>
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
        portalId="root"
        onBlur={() => {
          setTouched(true);
        }}
      />
      <div
        className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
      >
        {touched && error ? `Required` : ""}
      </div>
    </div>
  );
};

export default MyDateField;
