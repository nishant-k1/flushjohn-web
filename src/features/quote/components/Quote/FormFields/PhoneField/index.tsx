import { useField } from "formik";
import styles from "./styles.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.fieldRow}>
      <label className={styles.fieldLabel}>
        {label}
        <span style={{ color: "#ff4444", fontSize: "x-large" }}>*</span>
      </label>
      <div className={styles.inputContainer}>
        <div title="Enter 10-digit phone number">
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
            className={`${styles.phoneInput} ${touched && error ? "error_field" : ""}`}
            placeholder={props.placeholder || "Enter phone number"}
            limitMaxLength={true}
            maxLength={14}
            inputMode="numeric"
          />
        </div>
        {touched && error && <div className={styles.error}>{meta.error}</div>}
      </div>
    </div>
  );
};

export default PhoneField;
