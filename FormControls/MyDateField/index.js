import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";
import DatePicker from "react-datepicker";

const MyDateField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <DatePicker
        className={`${quickQuoteStyles.myInput} ${quickQuoteStyles.date}`}
        {...field}
        {...props}
        minDate={new Date()}
        selected={field.value}
        onChange={(value) => setValue(value)}
      />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyDateField;
