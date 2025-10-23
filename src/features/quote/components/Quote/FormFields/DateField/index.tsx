"use client";

import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import styles from "./styles.module.css";

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
