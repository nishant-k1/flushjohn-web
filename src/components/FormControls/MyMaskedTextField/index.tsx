import React from "react";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const MyMaskedTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <>
      <Tooltip
        placement="top"
        title="Use Numeric Keys"
      >
        <MaskedInput
          {...field}
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          // Add a placeholder or other necessary attributes here if needed
        />
      </Tooltip>

      {touched && error ? <div className={styles.error}>{error}</div> : null}
    </>
  );
};

export default MyMaskedTextField;
