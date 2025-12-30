"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import { initialQuoteValues } from "@/features/quote/contexts/QuoteContext";
import { apiBaseUrls } from "@/constants";
import TextField from "../FormFields/TextField";
import PhoneField from "../FormFields/PhoneField";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

const QuoteStep3 = () => {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { render, data, setQuoteRequested } = useContext(QuoteContext);
  const [_, setStep] = render;
  const [formValues, setFormValues] = data;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  const { API_BASE_URL } = apiBaseUrls;

  const handleLeadConversion = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-11248564671/EhUQCLz8kKoaEL_z3fMp",
      });
    }
  };

  const step3ValidationSchema = Yup.object({
    fName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    contactPersonName: Yup.string().required("Contact person name is required"),
    contactPersonPhone: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .required("Contact person phone is required"),
  });

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        validationSchema={step3ValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const finalData = {
              ...formValues,
              ...values,
              leadSource: "Web Lead",
            };

            const response = await fetch(`${API_BASE_URL}/leads`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(finalData),
            });

            if (response.ok) {
              setShowSuccessModal(true);
              setQuoteRequested(true);
              handleLeadConversion();
            } else {
              setShowErrorModal(true);
            }
          } catch (err) {
            if (process.env.NODE_ENV === "development") {
              console.error("Error submitting lead:", err);
            }
            setShowErrorModal(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <div className={styles.section}>
            <div className={styles.container}>
              <Form noValidate>
                <div className={styles.form}>
                  <TextField
                    label="First Name"
                    name="fName"
                    type="text"
                    maxLength="50"
                    autoComplete="given-name"
                    placeholder="Enter first name"
                  />
                  <TextField
                    label="Last Name"
                    name="lName"
                    type="text"
                    maxLength="50"
                    autoComplete="family-name"
                    placeholder="Enter last name"
                  />
                  <TextField
                    label="Company Name (If any)"
                    name="cName"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                    placeholder="Enter company name (optional)"
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter email address"
                  />
                  <PhoneField
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone number"
                  />
                  <TextField
                    label="Onsite Contact Person Name"
                    name="contactPersonName"
                    placeholder="Enter contact person name"
                  />
                  <PhoneField
                    label="Onsite Contact Person Phone"
                    name="contactPersonPhone"
                    autoComplete="off"
                    placeholder="Enter contact phone number"
                  />
                </div>
                <div className={`${styles.outerBox} ${styles.buttons}`}>
                  <button
                    type="submit"
                    className={styles.next}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        SUBMIT
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                  <button
                    className={styles.previous}
                    onClick={() => {
                      setStep(2);
                      window.scrollTo(0, 0);
                    }}
                  >
                    PREVIOUS
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setFormValues(initialQuoteValues);
          setStep(1);
          window.scrollTo(0, 0);
        }}
        title="Thank You!"
        message="Your quote request has been submitted successfully."
        submessage="One of our representatives will contact you within 24 hours."
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
        }}
        title="Submission Failed"
        message="Failed to submit quote request. Please try again."
        submessage="If the problem persists, please contact our support team."
      />
    </div>
  );
};

export default QuoteStep3;
