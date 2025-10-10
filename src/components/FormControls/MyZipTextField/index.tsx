"use client";

import React from "react";
import { useField } from "formik";
import { Tooltip } from "antd";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";

const MyZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.inputWrapper}>
      <Tooltip
        placement="top"
        title="Enter 5-digit zip code"
      >
        <input
          {...field}
          {...props}
          type="text"
          className={styles.input}
          maxLength={5}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
            setValue(value);
          }}
        />
      </Tooltip>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default MyZipTextField;
