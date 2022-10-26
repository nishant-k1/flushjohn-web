import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyMultilineTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...props}
      id="outlined-basic"
      label={label}
      placeholder={label}
      placeholdervariant="outlined"
      fullWidth
      multiline
      rows={2}
      size="small"
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
          fontFamily: "Times New Roman",
        },
      }}
    />
  );
};

export default MyMultilineTextField;
