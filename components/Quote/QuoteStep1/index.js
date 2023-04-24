import { Formik, Form, useField } from "formik";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "../../../contexts/QuoteContext";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  return (
    <div>
      <Formik
        initialValues={formValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await sleep(500);
          try {
            setFormValues((prevValues) => {
              return { ...prevValues, ...values };
            });
            setStep(2);
          } catch (err) {
            alert(err);
          }
        }}
      >
        <Form>
          <div className={styles.form}>
            <div className={styles.SPR}>
              <MyMaskedTextInput
                label="Standard Portable Restroom"
                name="SPR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={styles.DFR}>
              <MyMaskedTextInput
                label="Deluxe Flushable Restroom"
                name="DFR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={styles.ACR}>
              <MyMaskedTextInput
                label="ADA Portable Restroom"
                name="ACR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={styles.HWS}>
              <MyMaskedTextInput
                label="Hand Wash Station"
                name="HWS"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
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
