"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import { createSocket } from "@/utils/socketClient";
import type { Socket } from "socket.io-client";
import { initialQuoteValues } from "@/features/quote/contexts/QuoteContext";
import { apiBaseUrls } from "@/constants";
import TextField from "../FormFields/TextField";
import PhoneField from "../FormFields/PhoneField";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

const QuoteStep3 = () => {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [isSubmittingLocal, setIsSubmittingLocal] = React.useState(false);
  const { render, data, setQuoteRequested } = useContext(QuoteContext);
  const [_, setStep] = render;
  const [formValues, setFormValues] = data;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  const { API_BASE_URL } = apiBaseUrls;
  const socketRef = React.useRef<Socket | null>(null);
  
  // Lazy load socket.io-client
  React.useEffect(() => {
    let mounted = true;
    
    createSocket(`${API_BASE_URL}/leads`, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }).then((socket) => {
      if (mounted) {
        socketRef.current = socket;
      }
    });

    return () => {
      mounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [API_BASE_URL]);

  const submitInProgressRef = React.useRef(false);
  const socketSucceededRef = React.useRef(false);
  const httpCalledRef = React.useRef(false); // Track if HTTP was called to prevent socket duplicate
  const pendingLeadDataRef = React.useRef<any>(null);

  const handleLeadConversion = React.useCallback((url?: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const callback = () => {
        if (url) {
          window.location.href = url;
        }
      };

      window.gtag("event", "conversion", {
        send_to: "AW-11248564671/EhUQCLz8kKoaEL_z3fMp",
        event_callback: callback,
      });
    } else {

    }
  }, []);

  React.useEffect(() => {
    const currentSocket = socketRef.current;
    if (currentSocket) {
      currentSocket.on("connect", () => {

      });

      currentSocket.on("disconnect", () => {

      });

      currentSocket.on("connect_error", (error) => {

      });

      currentSocket.on("leadCreated", (response) => {
        if (submitInProgressRef.current && !httpCalledRef.current) {
          // Socket succeeded - mark as done
          socketSucceededRef.current = true;
          setShowSuccessModal(true);
          setQuoteRequested(true);
          handleLeadConversion();
          submitInProgressRef.current = false;
          setIsSubmittingLocal(false);
          pendingLeadDataRef.current = null;
        }
      });

      currentSocket.on("leadCreationError", (error) => {
        // Socket explicitly failed - use HTTP as fallback (no duplicate since socket failed)
        if (submitInProgressRef.current && !socketSucceededRef.current && !httpCalledRef.current) {
          if (pendingLeadDataRef.current) {
            httpCalledRef.current = true;
            createLeadViaHTTP(pendingLeadDataRef.current)
              .then(() => {
                setShowSuccessModal(true);
                setQuoteRequested(true);
                handleLeadConversion();
                submitInProgressRef.current = false;
                httpCalledRef.current = false;
                setIsSubmittingLocal(false);
                pendingLeadDataRef.current = null;
              })
              .catch(() => {
                setShowErrorModal(true);
                submitInProgressRef.current = false;
                httpCalledRef.current = false;
                setIsSubmittingLocal(false);
                pendingLeadDataRef.current = null;
              });
          }
        }
      });

      return () => {
        currentSocket.off("connect");
        currentSocket.off("disconnect");
        currentSocket.off("connect_error");
        currentSocket.off("leadCreated");
        currentSocket.off("leadCreationError");
      };
    }
  }, [handleLeadConversion, setQuoteRequested]);

  const createLeadViaHTTP = React.useCallback(
    async (data: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();

          return result;
        } else {
          const errorData = await response.json();

          throw new Error(errorData.message || "Failed to create lead");
        }
      } catch (error) {
        throw error;
      }
    },
    [API_BASE_URL]
  );

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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // CRITICAL: Early return if submission is already in progress (prevents duplicate submissions)
          if (submitInProgressRef.current) {
            console.warn("Submission already in progress, ignoring duplicate submit");
            return;
          }

          // Set local submitting state immediately to show spinner
          setIsSubmittingLocal(true);
          
          const finalData = {
            ...formValues,
            ...values,
            leadSource: "Web Lead",
          };

          // Reset flags for new submission
          socketSucceededRef.current = false;
          httpCalledRef.current = false;
          pendingLeadDataRef.current = finalData;

          submitInProgressRef.current = true;
          setSubmitting(true);

          // Socket-first approach: Use socket if connected, otherwise HTTP fallback
          // NO timeouts - socket events will handle success/failure
          if (socketRef.current && socketRef.current.connected) {
            // Socket is connected - emit and let event listeners handle response
            socketRef.current.emit("createLead", finalData);
            // Success/failure handled by "leadCreated" and "leadCreationError" event listeners
          } else {
            // Socket not connected - use HTTP immediately (no duplicate possible)
            httpCalledRef.current = true;
            try {
              await createLeadViaHTTP(finalData);
              setShowSuccessModal(true);
              setQuoteRequested(true);
              handleLeadConversion();
              submitInProgressRef.current = false;
              httpCalledRef.current = false;
              setIsSubmittingLocal(false);
              pendingLeadDataRef.current = null;
              setSubmitting(false);
            } catch (err) {
              if (process.env.NODE_ENV === "development") {
                console.error("Error submitting lead via HTTP:", err);
              }
              setShowErrorModal(true);
              submitInProgressRef.current = false;
              httpCalledRef.current = false;
              setSubmitting(false);
              setIsSubmittingLocal(false);
              pendingLeadDataRef.current = null;
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          // Force re-render by accessing the state value
          const showSpinner = isSubmittingLocal || isSubmitting;
          // Use a key to force re-render when state changes
          return (
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
                  disabled={showSpinner}
                >
                  {showSpinner ? (
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
        );
        }}
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
