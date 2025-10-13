"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/features/quote/contexts/QuoteContext";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialQuoteValues } from "@/features/quote/contexts/QuoteContext";
import { apiBaseUrls } from "@/constants";
import TextField from "../FormFields/TextField";
import PhoneField from "../FormFields/PhoneField";
import SuccessModal from "@/components/SuccessModal";

const QuoteStep3 = () => {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const { render, data, setQuoteRequested } = useContext(QuoteContext);
  const [_, setStep] = render;
  const [formValues, setFormValues] = data;

  React.useEffect(() => {
    setFormValues(formValues);
  }, [formValues]);

  const { API_BASE_URL } = apiBaseUrls;
  const socket = io(`${API_BASE_URL}/leads`, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const socketRef = React.useRef<Socket | null>(null);
  socketRef.current = socket;

  const createLead = React.useCallback((data: any) => {
    socketRef.current?.emit("createLead", data);
  }, []);

  const handleLeadConversion = (url?: string) => {
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
      console.warn("Google Ads tracking is not available");
    }
  };

  // Validation schema for Step 3
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
          try {
            // Merge final step values with existing form data
            const finalData = {
              ...formValues,
              ...values,
              leadSource: "Web Lead",
            };

            createLead(finalData);
            setShowSuccessModal(true);
            setQuoteRequested(true);
            handleLeadConversion();
            resetForm();
            setFormValues(initialQuoteValues);
            setStep(1);
          } catch (err) {
            console.log(err);
          }
        }}
      >
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
                >
                  SUBMIT
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
      </Formik>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.scrollTo(0, 0);
        }}
        title="Thank You!"
        message="Your quote request has been submitted successfully."
        submessage="One of our representatives will contact you within 24 hours."
      />
    </div>
  );
};

export default QuoteStep3;
