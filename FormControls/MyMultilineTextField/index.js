import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyMultilineTextField = ({ label, ...props }) => {
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
        multiline
        size="small"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        sx={{
          background: "white",
          borderRadius: ".5rem",
          outline: "none",
          border: "none",
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

export default MyMultilineTextField;
