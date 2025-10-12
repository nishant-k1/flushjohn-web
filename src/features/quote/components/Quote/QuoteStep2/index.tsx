"use client";

import React from "react";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import { Form, Formik } from "formik";
import TextField from "../FormFields/TextField";
import MultilineTextField from "../FormFields/MultilineTextField";
import ZipTextField from "../FormFields/ZipField";
import DateField from "../FormFields/DateField";

// Validation schema for Step 2
const step2ValidationSchema = Yup.object({
  deliveryDate: Yup.string().required("Delivery date is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  streetAddress: Yup.string().required("Street address is required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Zip code is required"),
});

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
      validationSchema={step2ValidationSchema}
      validateOnChange={false}
      validateOnBlur={true}
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
      <Form noValidate>
        <div className={styles.form}>
          <DateField
            label="Delivery Date"
            name="deliveryDate"
            placeholder="Select delivery date"
          />
          <DateField
            label="Pickup Date"
            name="pickupDate"
            placeholder="Select pickup date"
          />
          <TextField
            label="Street"
            name="streetAddress"
            placeholder="Enter street address"
            required
          />
          <ZipTextField
            label="Zip Code"
            name="zip"
          />
          <TextField
            label="City"
            name="city"
            placeholder="Enter city"
          />
          <TextField
            label="State"
            name="state"
            placeholder="Enter state"
          />
          <MultilineTextField
            label="Placement Instructions"
            name="instructions"
            placeholder="Enter any special placement instructions"
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
