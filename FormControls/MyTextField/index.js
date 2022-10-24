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
      }}
      InputLabelProps={{
        style: { color: "#000000" },
      }}
    />
  );
};

export default MyTextField;
