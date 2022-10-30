import { Formik, Form, useField } from "formik";
import QuoteStep1Styles from "../styles/QuoteStep1.module.css";
import { useContext } from "react";
import { QuoteContext } from "../contexts/QuoteContext";
import MaskedInput from "react-input-mask";
import { Tooltip } from "antd";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={QuoteStep1Styles.outerBox}>
      <label>{label}</label>
      <div className={QuoteStep1Styles.innerBox}>
        <Tooltip placement="top" title="Enter Number">
          <MaskedInput {...field} {...props} />
        </Tooltip>
        <p className={QuoteStep1Styles.units}>Units</p>
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
          <div className={QuoteStep1Styles.form}>
            <div className={QuoteStep1Styles.SPR}>
              <MyMaskedTextInput
                label="Standard Portable Restroom"
                name="SPR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={QuoteStep1Styles.DFR}>
              <MyMaskedTextInput
                label="Deluxe Flushable Restroom"
                name="DFR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={QuoteStep1Styles.ACR}>
              <MyMaskedTextInput
                label="ADA Portable Restroom"
                name="ACR"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
            <div className={QuoteStep1Styles.HWS}>
              <MyMaskedTextInput
                label="Hand Wash Station"
                name="HWS"
                mask="9999"
                maskChar=" "
                type="tel"
              />
            </div>
          </div>
          <div className={QuoteStep1Styles.buttons}>
            <button className={QuoteStep1Styles.button} type="submit">
              NEXT
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default QuoteStep1;
