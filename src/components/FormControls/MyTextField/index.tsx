import React from "react";
import { FieldHookConfig, useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>);
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
