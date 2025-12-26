"use client";

import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";
import styles from "./styles.module.css";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { logEvent } from "../../../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { apiBaseUrls } from "@/constants";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <NumericFormat
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMultilineTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className={styles.textarea}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Contact = () => {
  const { API_BASE_URL } = apiBaseUrls;
  const [state, setState] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  return (
    <React.Fragment>
      <div className={styles.section}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string().required("Required"),
            message: Yup.string()
              .min(1, "Message cannot be empty")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              const res = await axios.post(`${API_BASE_URL}/contact`, values);
              if (res.status === 200) {
                setState(true);
                setTimeout(() => {
                  setShowSuccessModal(true);
                }, 2000);
                try {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "button_click", {
                      event_category: "Button",
                      event_label: "Contact Email Button Clicked",
                    });
                  }
                } catch (gtagError) {
                  if (process.env.NODE_ENV === "development") {
                    console.warn("GTag error:", gtagError);
                  }
                }
                try {
                  logEvent({
                    category: "Button",
                    action: "Contact Email Form submit",
                    label: "Contact Email Button",
                    value: undefined,
                    nonInteraction: undefined,
                    transport: "beacon",
                  });
                } catch (logError) {
                  if (process.env.NODE_ENV === "development") {
                    console.warn("Log event error:", logError);
                  }
                }
                resetForm();
              } else {
                setShowErrorModal(true);
              }
            } catch (err) {
              if (process.env.NODE_ENV === "development") {
                console.error("Contact form error:", err);
              }
              setShowErrorModal(true);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <div className={styles.container}>
              <Breadcrumbs path={""} />
              <Form>
                <AnimationWrapper
                  effect={animations?.fadeWithScale}
                  className={styles.form}
                >
                  <div className={styles.firstName}>
                    <MyTextField
                      label="First Name"
                      name="firstName"
                      type="text"
                      maxLength="15"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className={styles.lastName}>
                    <MyTextField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      maxLength="20"
                      autoComplete="family-name"
                    />
                  </div>

                  <div className={styles.email}>
                    <MyTextField
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.phone}>
                    <MyMaskedTextInput
                      label="Phone"
                      name="phone"
                      mask="(999) 999-9999"
                      autoComplete="tel-national"
                    />
                  </div>

                  <div className={styles.message}>
                    <MyMultilineTextField
                      label="Message"
                      name="message"
                      type="textarea"
                    />
                  </div>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        SUBMITTING...
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </AnimationWrapper>
              </Form>
              {state && (
                <h1 style={{ color: "var(--text-primary)", marginTop: "2rem" }}>
                  Your message has been delivered
                </h1>
              )}

              {/* Google Maps Embed */}
              <div className={styles.mapContainer}>
                <h2 className={styles.mapTitle}>Our Location</h2>
                <div className={styles.mapWrapper}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.674!2d-75.5268!3d39.1615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDA5JzQxLjQiTiA3NcKwMzEnMzYuNSJX!5e0!3m2!1sen!2sus!4v1234567890&q=8+The+Green+STE+R,+Dover,+DE+19901"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FlushJohn Location - 8 The Green STE R, Dover, DE 19901"
                  ></iframe>
                </div>
                <p className={styles.mapAddress}>
                  8 The Green STE R, Dover, DE 19901, United States
                </p>
              </div>
            </div>
          )}
        </Formik>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Message Sent!"
        message="Your message has been delivered"
        submessage="We'll get back to you as soon as possible."
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Message Failed"
        message="Failed to send your message. Please try again."
        submessage="If the problem persists, please contact us directly."
      />
    </React.Fragment>
  );
};

export default Contact;
