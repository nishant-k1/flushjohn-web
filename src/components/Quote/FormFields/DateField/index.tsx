import { useField } from "formik";
import { DatePicker } from "antd";
import { useRef } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.css";
import "../../FormFields/styles.css";

const DateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const datePickerRef = useRef(null);

  return (
    <div className={styles.outerBox}>
      <label className={styles.label}>
        {label}
        {props.name !== "contactPersonPhone" && (
          <span style={{ color: "red", fontSize: "x-large" }}>*</span>
        )}
      </label>
      <div className={styles.innerBox}>
        <div ref={datePickerRef}>
          <DatePicker
            {...props}
            className={props.className}
            label={label}
            placeholder={""}
            format={"MM/DD/YYYY"}
            value={field.value ? dayjs(field.value) : null} // Ensure it's a Day.js object
            disabledDate={(d) => d && d.isBefore(dayjs(), "day")} // Use Day.js
            onChange={(date, dateString) => {
              if (date) {
                setValue(date.format("MMMM D, YYYY")); // Store in readable format
              } else {
                setValue(""); // Handle cleared value
              }
            }}
            onBlur={() => setTouched(true)}
            getPopupContainer={() => datePickerRef.current}
          />
          {touched && error ? (
            <div className={styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DateField;
