"use client";

import { Formik, Form, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./styles.module.css";
import React from "react";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { logEvent } from "../../../../../react-ga4-config";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { api } from "@/utils/apiClient";
import {
  GOOGLE_ADS_CONVERSION_CONTACT_FORM,
  GOOGLE_ADS_CONVERSION_VALUE_CONTACT,
  GOOGLE_ADS_CONVERSION_CURRENCY,
} from "@/config/env";
import { useFormAbandonmentTracking } from "@/hooks/useFormAbandonmentTracking";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props as FieldHookConfig<any>);
  return (
    <div>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={styles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyPhoneField = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <div>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <PhoneInput
        {...field}
        {...props}
        defaultCountry="US"
        countries={["US"]}
        addInternationalOption={false}
        countryCallingCodeEditable={false}
        onChange={(value) => setValue(value)}
        className={styles.input}
        placeholder="Enter phone number"
        limitMaxLength={true}
        maxLength={14}
      />
      {touched && error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};

const MyMultilineTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={styles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Contact = () => {
  const [state, setState] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  // Form abandonment tracking
  const { trackComplete } = useFormAbandonmentTracking({
    formType: "contact_form",
    totalFields: 5, // firstName, lastName, email, phone, message
  });

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
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            // ✅ OPTIMISTIC: Show success immediately (before API response)
            setState(true);
            setShowSuccessModal(true);
            trackComplete(); // Track form completion
            resetForm();

            // Google Ads conversion tracking
            try {
              if (
                typeof window !== "undefined" &&
                typeof window.gtag === "function" &&
                GOOGLE_ADS_CONVERSION_CONTACT_FORM
              ) {
                window.gtag("event", "conversion", {
                  send_to: GOOGLE_ADS_CONVERSION_CONTACT_FORM,
                  value: GOOGLE_ADS_CONVERSION_VALUE_CONTACT,
                  currency: GOOGLE_ADS_CONVERSION_CURRENCY,
                });
              }
            } catch (gtagError) {
              if (process.env.NODE_ENV === "development") {
                console.warn("GTag conversion error:", gtagError);
              }
            }

            // Analytics tracking (non-blocking)
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

            try {
              // Data is automatically serialized by apiClient
              // API request in background (non-blocking)
              const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
              await api.post(`${API_BASE_URL}/contact`, values);
              // If successful, success modal is already shown ✅
            } catch (err) {
              if (process.env.NODE_ENV === "development") {
                console.error("Contact form error:", err);
              }
              // ✅ ROLLBACK: Revert optimistic updates on error
              setState(false);
              setShowSuccessModal(false);
              setShowErrorModal(true);
              // Could optionally restore form with values if needed
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
                    <MyPhoneField
                      label="Phone"
                      name="phone"
                      autoComplete="tel"
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

              {/* Service Areas Information */}
              <div className={styles.mapContainer}>
                <h2 className={styles.mapTitle}>Our Service Areas</h2>
                <p className={styles.serviceAreasDescription}>
                  FlushJohn provides porta potty rental services across 25+
                  cities in 6 states: Texas, Florida, California, Georgia,
                  Illinois, and Delaware. We deliver directly to your location -
                  no physical storefront needed.
                  <a href="/service-areas" className={styles.serviceAreasLink}>
                    View all service areas →
                  </a>
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
