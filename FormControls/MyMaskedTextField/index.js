import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";
import MaskedInput from "react-input-mask";
import TextField from "@mui/material/TextField";

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      id="outlined-basic"
      label={label}
      placeholder={label}
      placeholdervariant="outlined"
      fullWidth
    >
      <MaskedInput className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </TextField>
  );
};

export default MyMaskedTextInput;
