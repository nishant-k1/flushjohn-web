import React from "react";
import { Formik } from "formik";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useField } from "formik";
import moment from "moment";
import styles from "../../QuickQuote/styles.module.css";
import Image from "next/image";

const MyDateField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  const datePickerRef = React.useRef(null);

  return (
    <div ref={datePickerRef}>
      <DatePicker
        {...props}
        className={props.className}
        label={props.label}
        value={field.value && moment(new Date(), "MM/DD/YYYY")}
        defaultValue={moment(new Date(), "MM/DD/YYYY")}
        format={"MM/DD/YYYY"}
        placeholder={props.label}
        disabledDate={(d) => !d || d.isBefore(new Date())}
        onChange={(e) => {
          setValue(moment(e).format("MMM Do YY"));
        }}
        getPopupContainer={() => datePickerRef.current}
        // getPopupContainer={(trigger) => trigger.parentNode} // disable the default behavior of closing on a click outside
      />
      {touched && error ? (
        <div className={styles.error}>
          {error + " "}
          <span>
            <Image
              style={{ height: "1.5rem" }}
              src="/assets/error.png"
              height={24}
              width={24}
            />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default MyDateField;
