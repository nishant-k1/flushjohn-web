import React from "react";
import { DatePicker } from "antd";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";

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
        label={props.label}
        placeholder={props.label}
        // value={field.value && new Date()}
        // defaultValue={new Date()}
        format={"MM/DD/YYYY"}
        disabledDate={(d: any) => !d || d.isBefore(new Date())}
        onChange={(date: any, dateString: string) => {
          setValue(
            new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          );
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
