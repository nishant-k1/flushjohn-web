"use client";

import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import RadioField from "../FormFields/RadioField";
import NumberField from "../FormFields/NumberField";

const step1StringValidationSchema = Yup.object({
  usageType: Yup.string().required("Usage type is required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        item: Yup.string(),
        desc: Yup.string(),
        qty: Yup.string()
          .matches(/^\d*$/, "Quantity must be a whole number")
          .test(
            "non-negative",
            "Quantity cannot be negative",
            function (value) {
              return parseInt(value || "0", 10) >= 0;
            }
          ),
        rate: Yup.string()
          .matches(/^\d*\.?\d{0,2}$/, "Rate must be a valid decimal")
          .test("non-negative", "Rate cannot be negative", function (value) {
            return parseFloat(value || "0") >= 0;
          }),
        amount: Yup.string()
          .matches(/^\d*\.?\d{0,2}$/, "Amount must be a valid decimal")
          .test("non-negative", "Amount cannot be negative", function (value) {
            return parseFloat(value || "0") >= 0;
          }),
      })
    )
    .test(
      "at-least-one-product",
      "At least one product must have a quantity greater than 0",
      function (products) {
        if (!products) return false;
        return products.some((product: any) => {
          return parseInt(product.qty || "0", 10) > 0; // Parse string to number for comparison
        });
      }
    ),
});

const step1ParsedValidationSchema = Yup.object({
  usageType: Yup.string().required("Usage type is required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        item: Yup.string(),
        desc: Yup.string(),
        qty: Yup.number().integer().min(1, "Quantity must be at least 1"),
        rate: Yup.number().min(0, "Rate cannot be negative"),
        amount: Yup.number().min(0, "Amount cannot be negative"),
      })
    )
    .min(1, "At least one product required"),
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
      validationSchema={step1StringValidationSchema}
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
          <div style={{ marginBottom: "16px", position: "relative" }}>
            <div className={styles.usage_type_row}>
              <label className={styles.field_label}>
                Usage Type
                <span style={{ color: "#ff4444", fontSize: "x-large" }}>
                  {" "}
                  *
                </span>
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
                <RadioField
                  label="Emergency"
                  name="usageType"
                  value="emergency"
                  className={styles.radio}
                />
                <RadioField
                  label="Renovation"
                  name="usageType"
                  value="renovation"
                  className={styles.radio}
                />
              </div>
            </div>
            <ErrorMessage name="usageType">
              {(msg) => {
                return <div className={styles.error}>Required</div>;
              }}
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
          <div style={{ position: "relative", minHeight: 0 }}>
          <ErrorMessage name="products">
            {(msg) => {
              return <div className={styles.error_message}>Required</div>;
            }}
          </ErrorMessage>
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
  );
};

export default QuoteStep1;
