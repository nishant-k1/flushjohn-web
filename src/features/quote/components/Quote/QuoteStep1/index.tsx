"use client";

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import RadioField from "../FormFields/RadioField";
import NumberField from "../FormFields/NumberField";

// Validation schema for Step 1
const step1ValidationSchema = Yup.object({
  usageType: Yup.string().required("Usage type is required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        item: Yup.string(),
        desc: Yup.string(),
        qty: Yup.number().min(0, "Quantity must be 0 or more"),
        rate: Yup.string(),
        amount: Yup.number(),
      })
    )
    .test(
      "at-least-one-product",
      "At least one product must have a quantity greater than 0",
      function (products) {
        if (!products) return false;
        return products.some((product: any) => {
          const qty = parseInt(product.qty) || 0;
          return qty > 0;
        });
      }
    ),
});

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
      validationSchema={step1ValidationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setFormValues((prevValues) => ({
            ...prevValues,
            ...values,
          }));
          setStep(2);
          window.scrollTo(0, 0);
        } catch (err) {
          alert(err);
        }
      }}
    >
      <Form noValidate>
        <div className={styles.form}>
          <div>
            <div className={styles.usage_type_row}>
              <label className={styles.field_label}>
                Usage Type
                <span style={{ color: "red", fontSize: "x-large" }}> *</span>
              </label>
              <div className={styles.radio_inner_box}>
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
            </div>
            <ErrorMessage name="usageType">
              {(msg) => <div className={styles.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          {products.map((item, index) => (
            <NumberField
              key={item.id || index}
              label={item.item}
              name={`products[${index}].qty`}
              mask="9999"
              type="tel"
            />
          ))}
          <ErrorMessage name="products">
            {(msg) => <div className={styles.error_message}>{msg}</div>}
          </ErrorMessage>
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
