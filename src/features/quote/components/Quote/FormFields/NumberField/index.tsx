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
      if (e.target.value === "0") {
        setValue("");
      } else {
        // Position cursor at the end when focusing
        setTimeout(() => {
          const length = e.target.value.length;
          e.target.setSelectionRange(length, length);
        }, 0);
      }
    },
    [setValue]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setTimeout(() => {
      const length = input.value.length;
      input.setSelectionRange(length, length);
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

  useEffect(() => {
    if (isFocused && inputRef.current) {
      const input = inputRef.current;
      setTimeout(() => {
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }, 0);
    }
  }, [field.value, isFocused]);

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputContainer}>
        <div className={styles.inputRow}>
          <NumericFormat
            {...field}
            {...props}
            ref={inputRef}
            className={`${styles.numberInput} ${touched && error ? styles.error_field : ""}`}
            placeholder=""
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
        <div className={`${styles.error} ${touched && error ? styles.errorVisible : styles.errorHidden}`}>
          {touched && error ? error : ""}
        </div>
      </div>
    </div>
  );
};

export default NumberField;
