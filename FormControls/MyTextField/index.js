import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  return (
    <>
      <input
        {...props}
        className={props.className}
        placeholder={label}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {touched || error ? (
        <div className={quickQuoteStyles.error}>
          {error + " "}
          <span>
            <img style={{ height: "1.5rem" }} src="/assets/error.png" />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default MyTextField;
