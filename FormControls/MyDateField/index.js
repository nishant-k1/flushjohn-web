import React from "react";
import { Formik } from "formik";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useField } from "formik";
import moment from "moment";
import { Box } from "@mui/material";
import quickQuoteStyles from "../../styles/QuickQuote.module.css";

const MyDateField = ({...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  const datePickerRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      datePickerRef.current.blur();
    }
  };

  return (
    <div ref={datePickerRef}>
      <DatePicker
        {...props}
        onClick={(event) => {
          event.stopPropagation();
        }}
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
        <div className={quickQuoteStyles.error}>
          {error + " "}
          <span>
            <img style={{ height: "1.5rem" }} src="/assets/error.png" />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default MyDateField;
