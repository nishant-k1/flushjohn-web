import React from "react";
import { useField } from "formik";
import styles from "./styles.module.css";

const MyRadioField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  return (
    <div className={styles.radioWrapper}>
      <label className={styles.radioLabel}>
        <input
          {...field}
          {...props}
          aria-label={props.name}
          type="radio"
          checked={field.value === props.value}
          className={props.className}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
        <span className={styles.labelText}>{label}</span>
      </label>
    </div>
  );
};

export default MyRadioField;