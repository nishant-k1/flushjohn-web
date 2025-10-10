import React from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyRadioField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  return (
    <>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "min-content max-content",
          justifyContent: "space-between",
          // columnGap: "1rem",
          backgroundColor: "white",
          padding: "6px",
        }}
      >
        <label
          style={{
            color: "var(--primary-bg-color)",
            fontWeight: "600",
            paddingLeft: "6px",
            fontSize: "small",
          }}
        >
          {label}
        </label>
        <input
          {...field}
          {...props}
          aria-label={props.name}
          type="radio"
          checked={field.value === props.value}
          // className={props.className}
          // placeholder={label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setTouched(true); // Mark the field as touched on blur
          }}
          style={{
            height: "1.2rem",
            width: "1.2rem",
          }}
        />
      </div>
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </>
  );
};

export default MyRadioField;
