"use client";

import React from "react";
import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/contexts/QuoteContext";
import RadioField from "../FormFields/RadioField";
import NumberField from "../FormFields/NumberField";

const QuoteStep1 = () => {
  const { render, data } = useContext(QuoteContext);
  const [_, setStep] = render;
  const [formValues, setFormValues] = data;
  const { products } = formValues;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setFormValues(values);
          setStep(2);
          window.scrollTo(0, 0);
        } catch (err) {
          alert(err);
        }
      }}
    >
      <Form>
        <div className={styles.form}>
          <div className={styles.radio_container}>
            <RadioField
              label="Event"
              name="usageType"
              value="event"
              className={styles.radio}
            />
            <RadioField
              label="Construction"
              name="usageType"
              value="construction"
              className={styles.radio}
            />
          </div>
          {products.map((item, index) => (
            <div key={index}>
              <NumberField
                label={item.name}
                name={`products[${index}].qty`}
                mask="9999"
                maskchar={null}
                type="tel"
              />
            </div>
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
  );
};

export default QuoteStep1;
