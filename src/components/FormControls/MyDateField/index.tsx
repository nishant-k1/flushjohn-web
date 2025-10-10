import React from "react";
import { DatePicker } from "antd";
import { useField } from "formik";
import dayjs from "dayjs"; // Import Day.js
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyDateField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  const datePickerRef = React.useRef(null);

  return (
    <div ref={datePickerRef}>
      <DatePicker
        {...props}
        className={props.className}
        label={label}
        placeholder={label}
        format={"MM/DD/YYYY"}
        value={field.value ? dayjs(field.value) : null} // Ensure it's a Day.js object
        disabledDate={(d) => d && d.isBefore(dayjs(), "day")} // Use Day.js
        onChange={(date: any, dateString: string) => {
          if (date) {
            setValue(date.format("MMMM D, YYYY")); // Store in readable format
          } else {
            setValue(""); // Handle cleared value
          }
        }}
        onBlur={() => {
          setTouched(true); // Mark the field as touched on blur
        }}
        getPopupContainer={() => datePickerRef.current}
        // getPopupContainer={(trigger) => trigger.parentNode} // disable the default behavior of closing on a click outside
      />
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};

export default MyDateField;
