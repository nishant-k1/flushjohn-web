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

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        <span style={{ color: "var(--error-border)", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <div title="Enter 10-digit phone number">
          <PhoneInput
            {...field}
            {...props}
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
          />
        </div>
        <div
          className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
        >
          {touched && error ? "Required" : ""}
        </div>
      </div>
    </div>
  );
};

export default PhoneField;
