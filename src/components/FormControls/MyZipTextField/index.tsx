"use client";

import React from "react";
import { useField } from "formik";
import { Tooltip } from "antd";
import styles from "../../QuickQuote/styles.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const MyZipTextField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  const USFlag = ({
    country,
    countryName,
  }: {
    country: string;
    countryName: string;
  }) => (
    <div
      role="img"
      aria-label={"USA"}
      style={{
        fontSize: "20px",
        marginRight: "8px",
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src="https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
        alt="us-flag"
      />
    </div>
  );

  return (
    <div className={styles.inputWrapper}>
      <Tooltip
        placement="top"
        title="Enter 5-digit zip code"
      >
        <PhoneInput
          {...field}
          {...props}
          className={styles.input}
          autoComplete={true}
          onChange={(value) => setValue(value)}
          limitMaxLength={true}
          maxLength={5}
          inputMode="numeric"
          initialValueFormat={false}
          addInternationalOption={false}
          international={false}
          flagComponent={USFlag}
          // defaultCountry="US"
          // countries={["US"]}
          displayInitialValueAsLocalNumber={false}

          // countryCallingCodeEditable={false}
        />
      </Tooltip>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default MyZipTextField;
