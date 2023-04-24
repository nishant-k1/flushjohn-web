import React from "react";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const MyMaskedTextField = ({ label, ...props }) => {
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
        />
      </Tooltip>

      {touched && error ? (
        <div className={styles.error}>
          {error + " "}
          <span>
            <img
              style={{ height: "1.5rem" }}
              src="/assets/error.png"
            />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default MyMaskedTextField;
