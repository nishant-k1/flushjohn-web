import React from "react";
import { Select, Space } from "antd";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const options = [
  { label: "Standard Portable Restroom", value: "Standard Portable Restroom" },
  { label: "Deluxe Flushable Restroom", value: "Deluxe Flushable Restroom" },
  { label: "ADA Portable Restroom", value: "ADA Portable Restroom" },
  { label: "Hand Wash Station", value: "Hand Wash Station" },
];

const MyMultipleSelectCheckmarks = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;

  const value = field.value;
  const selectProps = {
    ...props,
    mode: "multiple",
    style: {
      width: "100%",
    },
    value: value,
    options,
    onChange: (newValue: any) => {
      setValue(newValue);
    },
    placeholder: (
      <p
        style={{
          color: "var(--primary-bg-color)",
          fontWeight: 600,
          margin: 0,
        }}
      >
        Select Rental Item...
      </p>
    ),
    maxTagCount: "responsive",
  };
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Select
          {...selectProps}
          getPopupContainer={(trigger: any) => trigger.parentNode} // disable the default behavior of closing on a click outside
        />
      </Space>
      {touched && error ? (
        <div className={styles.error}>{`Required`}</div>
      ) : null}
    </div>
  );
};
export default MyMultipleSelectCheckmarks;
