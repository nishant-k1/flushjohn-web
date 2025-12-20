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
  return (
    <div className={styles.fieldRow}>
      <label
        className={styles.fieldLabel}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className={styles.inputContainer}>
        <textarea
          {...field}
          {...props}
          className={`${styles.textareaInput} ${meta.touched && meta.error ? styles.error_field : ""}`}
          placeholder={props.placeholder || label}
          onFocus={() => {
            // Hide error when field is focused
            setShowError(false);
          }}
        />
        <div className={`${styles.error} ${showError && meta.touched && meta.error ? styles.errorVisible : styles.errorHidden}`}>
          {meta.touched && meta.error ? "Required" : ""}
        </div>
      </div>
    </div>
  );
};

export default MultilineTextField;
