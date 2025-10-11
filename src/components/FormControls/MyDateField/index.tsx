import React from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyDateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <input
        type="date"
        {...field}
        {...props}
        className={
          touched && error
            ? `${props.className} ${styles.error_field}`
            : props.className
        }
        placeholder={label}
        min={today}
        onChange={(e) => {
          if (e.target.value) {
            // Convert to readable format
            const date = new Date(e.target.value);
            const formatted = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            setValue(formatted);
          } else {
            setValue("");
          }
        }}
        onBlur={() => {
          setTouched(true);
        }}
      />
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};

export default MyDateField;
