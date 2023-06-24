import React from "react";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";
import Image from "next/image";

const MyRadioField = ({ label, ...props }) => {
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
          type="radio"
          checked={field.value === props.value}
          // className={props.className}
          // placeholder={label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          style={{
            height: "1.2rem",
            width: "1.2rem",
          }}
        />
      </div>
      {touched && error ? (
        <div className={styles.error}>{error + " "}</div>
      ) : null}
    </>
  );
};

export default MyRadioField;
