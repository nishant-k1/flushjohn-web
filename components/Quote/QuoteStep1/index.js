import React from "react";
import { Formik, Form, useField } from "formik";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "../../../contexts/QuoteContext";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const MyRadioField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue, setTouched, setError } = helpers;
  return (
    <>
      <div className={styles.radio_outerBox}>
        <label>{label}</label>
        <input
          {...field}
          {...props}
          style={{
            height: "1.5rem",
            width: "1.5rem",
          }}
          type="radio"
          checked={field.value === props.value}
          className={props.className}
          // placeholder={label}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>

      {touched && error ? (
        <div className={styles.error}>{error + " "}</div>
      ) : null}
    </>
  );
};

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label>{label}</label>
      <div className={styles.innerBox}>
        <Tooltip
          placement="top"
          title="Enter Number"
        >
          <MaskedInput
            {...field}
            {...props}
          />
        </Tooltip>
        <p className={styles.units}>Units</p>
      </div>
    </div>
  );
};

const QuoteStep1 = () => {
  const { render, data } = useContext(QuoteContext);
  const [step, setStep] = render;
  const [formValues, setFormValues] = data;
  const { products } = formValues;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setFormValues(values);
            setStep(2);
          } catch (err) {
            alert(err);
          }
        }}
      >
        <Form>
          <div className={styles.form}>
            <div className={styles.radio_container}>
              <MyRadioField
                label="Event"
                name="usageType"
                value="event"
                className={styles.radio}
              />
              <MyRadioField
                label="Construction"
                name="usageType"
                value="construction"
                className={styles.radio}
              />
            </div>
            {products.map((item, index) => (
              <MyMaskedTextInput
                key={index}
                label={item.name}
                name={`products[${index}].qty`}
                mask="9999"
                maskChar=""
                type="tel"
              />
            ))}
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.button}
              type="submit"
            >
              NEXT
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default QuoteStep1;
