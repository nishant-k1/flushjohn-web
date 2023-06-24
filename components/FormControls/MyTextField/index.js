import React from "react";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";
import Image from "next/image";

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  return (
    <>
      <input
        {...field}
        {...props}
        className={props.className}
        placeholder={label}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {touched && error ? (
        <div className={styles.error}>{error + " "}</div>
      ) : null}
    </>
  );
};

export default MyTextField;
