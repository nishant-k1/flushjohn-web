"use client";

import React, { useRef, useEffect } from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const MyPhoneTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const containerRef = useRef<HTMLDivElement>(null);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    // Show error only after field is touched (blurred) and there's an error
    if (touched && error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [touched, error]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Only hide error if field is not touched yet
        // If field is touched and has error, keep showing it
        if (!touched) {
          setShowError(false);
        }
      }
    };

    if (showError) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showError, touched]);

  return (
    <div
      ref={containerRef}
      className={styles.inputWrapper}
      style={{ position: "relative" }}
    >
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
          onBlur={() => {
            setTouched(true);
          }}
          className={
            touched && error
              ? `${styles.input} ${styles.error_field}`
              : styles.input
          }
          limitMaxLength={true}
          maxLength={14}
          inputMode="numeric"
        />
      </div>
      <div
        className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}
      >
        {touched && error ? error : ""}
      </div>
    </div>
  );
};

export default MyPhoneTextField;
