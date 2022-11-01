import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";
import MaskedInput from "react-input-mask";
import TextField from "@mui/material/TextField";

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      label={label}
      placeholder={label}
      placeholdervariant="outlined"
      fullWidth
      sx={{
        background: "white",
        borderRadius: ".5rem",
        borderColor: "red",
        color: "white",
        border: "none",
        outline: "none",
      }}
      InputLabelProps={{
        style: {
          color: "black",
          fontWeight: 100,
          fontSize: "medium",
        },
      }}
    >
      <MaskedInput className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </TextField>
  );
};

export default MyMaskedTextInput;
