import { useField } from "formik";
import styles from "./styles.module.css";
import { Tooltip } from "antd";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRef } from "react";

const PhoneField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  const datePickerRef = useRef(null);

  return (
    <div className={styles.outerBox}>
      <label className={styles.label}>
        {label}
        <span style={{ color: "red", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.innerBox}>
        <div ref={datePickerRef}>
          <Tooltip
            placement="top"
            title="Enter 10-digit phone number"
          >
            <PhoneInput
              {...field}
              {...props}
              defaultCountry="US"
              addInternationalOption={false}
              countries={["US"]}
              autoComplete={"zip"}
              countryCallingCodeEditable={false}
              displayInitialValueAsLocalNumber={true}
              onChange={(value) => setValue(value)}
              className={styles.input}
              limitMaxLength={true}
              maxLength={14}
              inputMode="numeric"
            />
          </Tooltip>
          {touched && error ? (
            <div className={styles.error}>{meta.error + " "}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PhoneField;
