import React from "react";
import { FieldHookConfig, useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  return (
    <>
      <input
        {...field}
        {...props}
        className={
          touched && error
            ? `${props.className} ${styles.error_field}`
            : props.className
        }
        placeholder={label}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          setTouched(true); // Mark the field as touched on blur
        }}
      />
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </>
  );
};

export default MyTextField;
