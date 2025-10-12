"use client";

import React from "react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import { Form, Formik } from "formik";
import TextField from "../FormFields/TextField";
import MultilineTextField from "../FormFields/MultilineTextField";
import ZipTextField from "../FormFields/ZipField";
import DateField from "../FormFields/DateField";

const QuoteStep2 = () => {
  const { render, data } = useContext(QuoteContext);
  const [_, setStep] = render;
  const [formValues, setFormValues] = data;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues}
      // validationSchema={Yup.object({
      //   deliveryDate: Yup.string().required("Required"),
      //   pickupDate: Yup.string().required("Required"),
      //   street: Yup.string().required("Required"),
      //   zip: Yup.string().required("Required"),
      // })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setFormValues((prevValues) => ({
            ...prevValues,
            ...values,
          }));
          setStep(3);
          window.scrollTo(0, 0);
        } catch (err) {}
      }}
    >
      <Form>
        <div className={styles.form}>
          <DateField
            label="Delivery Date"
            name="deliveryDate"
          />
          <DateField
            label="Pickup Date"
            name="pickupDate"
          />
          <TextField
            label="Street"
            name="streetAddress"
          />
          <ZipTextField
            label="Zip Code"
            name="zip"
          />
          <TextField
            label="City"
            name="city"
          />
          <TextField
            label="State"
            name="state"
          />
          <MultilineTextField
            label="Placement Instructions"
            name="instructions"
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.next}
          >
            NEXT
          </button>
          <button
            onClick={() => {
              setStep(1);
              window.scrollTo(0, 0);
            }}
            className={styles.previous}
          >
            PREVIOUS
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default QuoteStep2;
