import { useField } from "formik";
import styles from "./styles.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useEffect } from "react";

const PhoneField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  const errorId = `${props.name || 'phone'}-error`;
  const fieldId = props.id || props.name || `phone-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = touched && error;
  const errorMessage = typeof error === 'string' ? error : 'Required';

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel} htmlFor={fieldId}>
        {label}
        <span style={{ color: "var(--error-border)", fontSize: "x-large" }} aria-label="required">*</span>
      </label>
      <div className={styles.inputContainer}>
        <div title="Enter 10-digit phone number">
          <PhoneInput
            {...field}
            {...props}
            id={fieldId}
            defaultCountry="US"
            addInternationalOption={false}
            countries={["US"]}
            autoComplete="tel"
            countryCallingCodeEditable={false}
            displayInitialValueAsLocalNumber={true}
            onChange={(value) => setValue(value || "")}
            onFocus={() => {
              // Hide error when field is focused
              setShowError(false);
            }}
            className={`${styles.phoneInput} ${touched && error ? "error_field" : ""}`}
            placeholder={props.placeholder || "Enter phone number"}
            limitMaxLength={true}
            maxLength={14}
            inputMode="numeric"
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? errorId : undefined}
          />
        </div>
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

export default PhoneField;
