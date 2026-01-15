import { useField } from "formik";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const MultilineTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (meta.touched && meta.error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [meta.touched, meta.error]);
  const errorId = `${props.name || 'textarea'}-error`;
  const fieldId = props.id || props.name || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = meta.touched && meta.error;
  const errorMessage = 'Required';

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel} htmlFor={fieldId}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <textarea
          {...field}
          {...props}
          id={fieldId}
          className={`${styles.textareaInput} ${meta.touched && meta.error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
          onFocus={() => {
            // Hide error when field is focused
            setShowError(false);
          }}
        />
        <div
          id={errorId}
          className={`${styles.error} ${showError && meta.touched && meta.error ? styles.errorVisible : styles.errorHidden}`}
          role="alert"
          aria-live="polite"
        >
          {meta.touched && meta.error ? errorMessage : ""}
        </div>
      </div>
    </div>
  );
};

export default MultilineTextField;
