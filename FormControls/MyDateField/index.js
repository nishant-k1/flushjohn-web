import React from "react";
import { Formik } from "formik";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useField } from "formik";
import moment from "moment";
import { Box } from "@mui/material";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyDateField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <Box>
      <label
        style={{
          color: "black",
          fontWeight: 100,
          fontSize: "medium",
        }}
      >
        {props.label}
      </label>
      <DatePicker
        {...props}
        className={props.className}
        label={props.label}
        defaultValue={moment(new Date(), "MM/DD/YYYY")}
        format={"MM/DD/YYYY"}
        placeholder={props.label}
        disabledDate={(d) => !d || d.isBefore(new Date())}
        onChange={(e) => {
          setValue(moment(e).format("MMM Do YY"));
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
    </Box>
  );
};

export default MyDateField;
