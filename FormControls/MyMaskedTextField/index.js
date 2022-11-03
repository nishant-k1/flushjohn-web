import React from "react";
import { useField } from "formik";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const MyMaskedTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <>
      <Tooltip placement="top" title="Use Numeric Keys">
        <MaskedInput
          {...props}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Tooltip>

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

export default MyMaskedTextField;
