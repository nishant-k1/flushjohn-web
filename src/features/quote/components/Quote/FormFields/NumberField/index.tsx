import { useField } from "formik";
import styles from "./styles.module.css";
import { NumericFormat } from "react-number-format";
import { useState, useCallback, useRef, useEffect } from "react";

const NumberField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Clear the field if it contains "0" value
      if (e.target.value === "0") {
        setValue("");
      }
    },
    [setValue]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Keep field empty - don't restore any default value
    // The placeholder "0" will show when field is empty
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    // Position cursor at the beginning when clicking
    const input = e.currentTarget;
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(0, 0);
    }, 0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const currentValue = parseInt(e.currentTarget.value || "0", 10);
        const newValue = currentValue + 1;
        setValue(newValue.toString());
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const currentValue = parseInt(e.currentTarget.value || "0", 10);
        const newValue = Math.max(0, currentValue - 1);
        setValue(newValue.toString());
      }
    },
    [setValue]
  );

  // Position cursor at the beginning whenever the field value changes
  useEffect(() => {
    if (isFocused && inputRef.current) {
      const input = inputRef.current;
      setTimeout(() => {
        input.setSelectionRange(0, 0);
      }, 0);
    }
  }, [field.value, isFocused]);

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputRow}>
        <NumericFormat
          {...field}
          {...props}
          ref={inputRef}
          className={`${styles.numberInput} ${touched && error ? styles.error_field : ""}`}
          placeholder="0"
          title="Enter Quantity - Use arrow keys to increment/decrement"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          allowNegative={false}
          decimalScale={0}
          style={{ textAlign: "left" }}
        />
        <span className={styles.unitsText}>Units</span>
      </div>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default NumberField;
