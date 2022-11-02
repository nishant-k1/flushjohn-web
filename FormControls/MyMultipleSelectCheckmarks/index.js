import React, { useState } from "react";
import { Select, Space } from "antd";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const options = [
  { label: "Standard Portable Restroom", value: "Standard Portable Restroom" },
  { label: "Deluxe Flushable Restroom", value: "Deluxe Flushable Restroom" },
  { label: "ADA Portable Restroom", value: "ADA Portable Restroom" },
  { label: "Hand Wash Station", value: "Hand Wash Station" },
];

const MyMultipleSelectCheckmarks = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: (
      <p
        style={{
          color: "rgba(0, 0, 0, 0.7)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Select Item...
      </p>
    ),
    maxTagCount: "responsive",
  };
  return (
    <>
      {" "}
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Select {...selectProps} />
      </Space>
      {touched && error ? (
        <div className={quickQuoteStyles.error}>
          {error + " "}
          <span>
            <img style={{ height: "1.5rem" }} src="/assets/error.png" />
          </span>
        </div>
      ) : null}
    </>
  );
};
export default MyMultipleSelectCheckmarks;
