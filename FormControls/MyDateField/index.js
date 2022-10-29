import React from "react";
import { Formik } from "formik";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useField } from "formik";
import moment from "moment";
import { Box } from "@mui/material";

const MyDateField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <Box sx={{}}>
      <label
        style={{
          color: "white",
          fontWeight: 100,
          fontSize: "medium",
          fontFamily: "Times New Roman",
        }}
      >
        {props.label}
      </label>
      <DatePicker
        {...props}
        label={props.label}
        defaultValue={moment(new Date(), "MM/DD/YYYY")}
        format={"MM/DD/YYYY"}
        style={{
          color: "black",
          fontWeight: 100,
          fontSize: "medium",
          fontFamily: "Times New Roman",
          width: "100%",
          height: "2.5rem",
        }}
        placeholder={props.label}
        onChange={(e) => {
          setValue(moment(e).format("MMM Do YY"));
        }}
      />
    </Box>
  );
};

export default MyDateField;
