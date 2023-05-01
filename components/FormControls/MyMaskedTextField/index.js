import React from "react";
import { useField } from "formik";
import styles from "../../QuickQuote/styles.module.css";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";
import Image from "next/image";

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
            <Image
              style={{ height: "1.5rem" }}
              src="/assets/error.png"
              height={80}
              width={128}
            />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default MyMaskedTextField;
