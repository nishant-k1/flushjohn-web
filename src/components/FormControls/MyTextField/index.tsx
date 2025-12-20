import React, { useRef, useEffect } from "react";
import { FieldHookConfig, useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    <div ref={containerRef} style={{ position: "relative" }}>
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
        onBlur={(e) => {
          field.onBlur(e); // Call Formik's onBlur to trigger validation
          setTouched(true); // Mark the field as touched on blur
        }}
      />
      <div className={`${styles.error} ${showError && touched && error ? styles.errorVisible : styles.errorHidden}`}>
        {touched && error ? `Required` : ""}
      </div>
    </div>
  );
};

export default MyTextField;
