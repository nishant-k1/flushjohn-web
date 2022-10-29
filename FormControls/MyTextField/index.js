import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const MyTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <TextField
      id="outlined-basic"
      label={label}
      placeholder={label}
      placeholdervariant="outlined"
      fullWidth
      size="small"
      {...props}
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
          color: "#606060",
          fontWeight: 100,
          fontSize: "medium",
          fontFamily: "Times New Roman",
        },
      }}
    />
  );
};

export default MyTextField;
