import { useField } from "formik";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const TextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        {(props.name === "email" ||
          props.name === "fName" ||
          props.name === "contactPersonName" ||
          props.name === "streetAddress" ||
          props.required) && (
          <span style={{ color: "#ff4444", fontSize: "x-large" }}>*</span>
        )}
      </label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          {...props}
          className={`${styles.textInput} ${touched && error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={() => {
            // Hide error when field is focused
            setShowError(false);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        <div className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}>
          {touched && error ? "Required" : ""}
        </div>
      </div>
    </div>
  );
};

export default TextField;
