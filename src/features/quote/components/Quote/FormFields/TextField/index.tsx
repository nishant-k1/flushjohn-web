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

  const errorId = `${props.name || 'field'}-error`;
  const fieldId = props.id || props.name || `field-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = touched && error;
  const errorMessage = typeof error === 'string' ? error : 'Required';

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel} htmlFor={fieldId}>
        {label}
        {(props.name === "email" ||
          props.name === "fName" ||
          props.name === "contactPersonName" ||
          props.name === "streetAddress" ||
          props.required) && (
          <span style={{ color: "var(--error-border)", fontSize: "x-large" }} aria-label="required">*</span>
        )}
      </label>
      <div className={styles.inputContainer}>
        <input
          {...field}
          {...props}
          id={fieldId}
          className={`${styles.textInput} ${touched && error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
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
        <div
          id={errorId}
          className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
          role="alert"
          aria-live="polite"
        >
          {touched && error ? errorMessage : ""}
        </div>
      </div>
    </div>
  );
};

export default TextField;
