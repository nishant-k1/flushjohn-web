import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextField;
