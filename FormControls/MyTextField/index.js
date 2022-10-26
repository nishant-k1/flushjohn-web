import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      id="outlined-basic"
      label={label}
      placeholder={label}
      placeholdervariant="outlined"
      fullWidth
      size="small"
      {...props}
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
          fontFamily: "Times New Roman",
        },
      }}
    />
  );
};

export default MyTextField;
