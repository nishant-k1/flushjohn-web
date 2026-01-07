"use client";

import React, { useEffect } from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-animations.css";
import { Calendar } from "lucide-react";
import styles from "./styles.module.css";

const MIN_DATE = dayjs().startOf("day").toDate();

interface CustomInputProps {
  value?: string;
  onClick?: (e: React.MouseEvent) => void;
  error?: boolean;
  className?: string;
  placeholder?: string;
}

const CustomInput = React.memo(
  React.forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick, error, className, placeholder }, ref) => {
      const [isHovered, setIsHovered] = React.useState(false);
      const iconRef = React.useRef<HTMLDivElement>(null);

      // Ensure placeholder shows when value is empty
      const isEmpty = !value || value.trim() === "";
      const displayValue = isEmpty ? "" : value;

      // Update icon style on hover state change
      React.useEffect(() => {
        if (iconRef.current) {
          if (isHovered) {
            iconRef.current.style.opacity = "0.8";
            iconRef.current.style.filter =
              "drop-shadow(0 0 6px rgba(140, 111, 72, 0.3))";
          } else {
            iconRef.current.style.opacity = "0.6";
            iconRef.current.style.filter =
              "drop-shadow(0 0 4px rgba(140, 111, 72, 0.2))";
          }
        }
      }, [isHovered]);

      return (
        <div
          className={styles.inputWrapper}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <input
            ref={ref}
            value={displayValue}
            placeholder={placeholder || ""}
            readOnly
            onClick={onClick}
            className={className || ""}
            style={{
              transition: "all 0.3s ease-in-out",
              willChange: "border-color, box-shadow",
            }}
          />
          <div
            ref={iconRef}
            className={styles.calendarIcon}
            onClick={onClick}
            style={{
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              filter: "drop-shadow(0 0 4px rgba(140, 111, 72, 0.2))",
              opacity: "0.6",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 8px rgba(140, 111, 72, 0.4))";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = isHovered ? "0.8" : "0.6";
              e.currentTarget.style.filter = isHovered
                ? "drop-shadow(0 0 6px rgba(140, 111, 72, 0.3))"
                : "drop-shadow(0 0 4px rgba(140, 111, 72, 0.2))";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <Calendar size={18} />
          </div>
        </div>
      );
    }
  )
);
CustomInput.displayName = "CustomInput";

interface DateInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
  disabled?: boolean;
  className?: string;
  variant?: "quickquote" | "fullform";
  [key: string]: any;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  label,
  placeholder,
  dateFormat = "MM/dd/yyyy",
  minDate = MIN_DATE,
  disabled = false,
  className,
  variant = "fullform",
  ...props
}) => {
  const [field, meta] = useField(name);
  const { error, touched } = meta;
  const hasError = touched && !!error;
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Force datepicker wrapper to full width and prevent library from overriding
  React.useEffect(() => {
    if (!containerRef.current) return;

    const forceWidth = () => {
      if (containerRef.current) {
        const wrapper = containerRef.current.querySelector('.react-datepicker-wrapper');
        if (wrapper instanceof HTMLElement) {
          wrapper.style.setProperty('width', '100%', 'important');
          wrapper.style.setProperty('display', 'inline-block', 'important');
        }
        const inputContainer = containerRef.current.querySelector('.react-datepicker__input-container');
        if (inputContainer instanceof HTMLElement) {
          inputContainer.style.setProperty('width', '100%', 'important');
          inputContainer.style.setProperty('display', 'block', 'important');
        }
      }
    };

    // Apply immediately
    forceWidth();

    // Apply after a short delay to override library's initialization
    const timeoutId = setTimeout(forceWidth, 0);

    // Set up MutationObserver to catch any style changes
    const observer = new MutationObserver(forceWidth);
    
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [hasError, touched, error]); // Re-run when error state changes

  // For quickquote variant, use label as placeholder if no placeholder provided
  const finalPlaceholder =
    placeholder || (variant === "quickquote" ? label : "Select date");

  // Parse the date value - handle ISO strings, formatted dates, and Date objects
  const parseDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;

    // Try parsing with dayjs first (handles ISO strings and various formats)
    const parsed = dayjs(value);
    if (parsed.isValid()) {
      return parsed.toDate();
    }

    // Fallback to native Date parsing
    const nativeDate = new Date(value);
    return isNaN(nativeDate.getTime()) ? null : nativeDate;
  };

  const selectedDate = parseDate(field.value);

  const handleDateChange = (date: Date | null) => {
    // Store as ISO string for API compatibility
    const isoString = date ? dayjs(date).toISOString() : "";
    field.onChange({
      target: {
        name: field.name,
        value: isoString,
      },
    });
  };

  // Render based on variant
  if (variant === "quickquote") {
    return (
      <div className={`${styles.quickQuoteContainer} ${className || ""}`}>
        <div className={styles.quickQuoteInputWrapper} ref={containerRef}>
          <DatePicker
            customInput={
              <CustomInput
                error={hasError}
                className={`${styles.quickQuoteInput} ${hasError ? styles.quickQuoteError : ""} ${props.inputClassName || ""}`}
                placeholder={finalPlaceholder}
              />
            }
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={minDate}
            dateFormat={dateFormat}
            disabled={disabled}
            placeholderText={finalPlaceholder}
            wrapperClassName={styles.datePickerWrapper}
            calendarClassName={styles.datePickerCalendar}
            popperPlacement="bottom-start"
            dayClassName={(date: Date) => {
              const day = dayjs(date);
              const today = dayjs();
              const selected =
                selectedDate && dayjs(selectedDate).isSame(day, "day");

              if (selected) return styles.selectedDay;
              if (day.isSame(today, "day")) return styles.todayDay;
              return styles.day;
            }}
            {...props}
          />
          {hasError && (
            <div
              className={`${styles.quickQuoteError} ${styles.quickQuoteErrorVisible}`}
            >
              Required
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full form variant (default)
  return (
    <div
      className={`${styles.dateInputContainer} ${styles.fieldRow} ${className || ""}`}
    >
      {label && (
        <label className={styles.fieldLabel}>
          {label}
          {props.required && (
            <span style={{ color: "#ff4444", fontSize: "x-large" }}>*</span>
          )}
        </label>
      )}
      <div className={styles.inputContainer} ref={containerRef}>
        <DatePicker
          customInput={
            <CustomInput
              error={hasError}
              className={`${styles.fullFormInput} ${hasError ? styles.error_field : ""} ${props.inputClassName || ""}`}
              placeholder={finalPlaceholder}
            />
          }
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={minDate}
          dateFormat={dateFormat}
          disabled={disabled}
          placeholderText={finalPlaceholder}
          wrapperClassName={styles.datePickerWrapper}
          calendarClassName={styles.datePickerCalendar}
          popperPlacement="bottom-start"
          dayClassName={(date: Date) => {
            const day = dayjs(date);
            const today = dayjs();
            const selected =
              selectedDate && dayjs(selectedDate).isSame(day, "day");

            if (selected) return styles.selectedDay;
            if (day.isSame(today, "day")) return styles.todayDay;
            return styles.day;
          }}
          {...props}
        />
        {hasError && (
          <div className={`${styles.error} ${styles.errorVisible}`}>
            {error || "Required"}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateInput;
