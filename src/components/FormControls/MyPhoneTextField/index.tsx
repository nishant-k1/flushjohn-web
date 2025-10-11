"use client";

import React from "react";
import { useField } from "formik";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const MyPhoneTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div className={styles.inputWrapper}>
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
          className={styles.input}
          limitMaxLength={true}
          maxLength={14}
          inputMode="numeric"
        />
      </div>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default MyPhoneTextField;
