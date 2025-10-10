"use client";

import React from "react";
import { useField } from "formik";
import { Tooltip } from "antd";
import styles from "./styles.module.css";

const ZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.outerBox}>
      <label>
        {label} <span style={{ color: "red", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.innerBox}>
        <Tooltip
          placement="top"
          title="Enter 5-digit zip code"
        >
          <input
            {...field}
            {...props}
            type="text"
            className={styles.input}
            autoComplete="postal-code"
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
    </div>
  );
};

export default ZipTextField;
