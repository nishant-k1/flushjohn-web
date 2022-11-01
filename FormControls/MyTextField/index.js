import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <>
      <TextField
        {...props}
        label={label}
        placeholder={label}
        placeholdervariant="outlined"
        fullWidth
        size="small"
        onChange={(e) => {
          setValue(e.target.value);
        }}
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
      />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>
          {meta.error + " "}
          <span>
            <img style={{ height: "1.5rem" }} src="/assets/error.png" />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default MyTextField;
