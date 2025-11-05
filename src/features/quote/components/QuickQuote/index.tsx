"use client";

import { Formik, Form, ErrorMessage, useFormikContext, Field } from "formik";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import MyMultipleSelectCheckmarks from "@/components/FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "@/components/FormControls/MyTextField";
import MyDateField from "@/components/FormControls/MyDateField";
import MyPhoneTextField from "@/components/FormControls/MyPhoneTextField";
import MyMultilineTextField from "@/components/FormControls/MyMultilineTextField";
import Button from "@/components/UI/Button";
import Grid from "@/components/UI/Grid";
import { SendIcon, CloseIcon } from "@/components/UI/Icons";
import * as Yup from "yup";
import QuickQuoteButton from "./QuickQuoteButton";
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext";
import { ClientWidthContext } from "@/contexts/ClientWidthContext";
import { logEvent } from "../../../../../react-ga4-config";
import { ClientWidthContextType } from "@/contexts/ClientWidthContext";
import { QuickQuoteContextType } from "../../contexts/QuickQuoteContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { io, Socket } from "socket.io-client";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import SuccessModal from "@/components/SuccessModal";

const quickQuoteValidationSchema = Yup.object().shape({
  usageType: Yup.string().required("Please select usage type"),
  products: Yup.array()
    .min(1, "Please select at least one portable unit")
    .required("Please select at least one portable unit"),
  deliveryDate: Yup.string().required("Delivery date is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Zip code is required"),
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  lName: Yup.string(),
  instructions: Yup.string(),
});

const UsageTypeField = () => {
  const { errors, touched, values, setFieldValue, setFieldTouched } =
    useFormikContext<any>();
  const hasError = touched.usageType && errors.usageType;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const options = [
    { label: "Event", value: "event" },
    { label: "Construction", value: "construction" },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = async (value: string) => {
    await setFieldValue("usageType", value);
    setFieldTouched("usageType", false);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === values.usageType);

  return (
    <Grid
      item
      xs={12}
    >
      <div
        ref={dropdownRef}
        style={{ position: "relative", width: "100%" }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={hasError ? styles.error_field : ""}
          style={{
            padding: "0 12px",
            border: hasError ? "2px solid red" : "1px solid #d9d9d9",
            borderRadius: "4px",
            cursor: "pointer",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            transition: "border-color 0.2s",
          }}
        >
          <span
            style={{
              color: values.usageType ? "#333" : "rgba(0, 0, 0, 0.6)",
              fontSize: "14px",
              fontWeight: 500,
              flex: 1,
            }}
          >
            {selectedOption ? selectedOption.label : "Usage Type"}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, opacity: 0.6 }}
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              marginTop: "6px",
              maxHeight: "240px",
              overflowY: "auto",
              zIndex: 1000,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  background:
                    values.usageType === option.value
                      ? "rgba(169, 93, 31, 0.1)"
                      : "white",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "all 0.2s",
                  borderLeft:
                    values.usageType === option.value
                      ? "3px solid var(--primary-bg-color)"
                      : "3px solid transparent",
                  fontSize: "14px",
                  fontWeight: values.usageType === option.value ? 600 : 400,
                  color:
                    values.usageType === option.value
                      ? "var(--primary-bg-color)"
                      : "#333",
                }}
                onMouseEnter={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background = "#fafafa";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    values.usageType === option.value
                      ? "rgba(169, 93, 31, 0.1)"
                      : "white";
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <ErrorMessage name="usageType">
        {(msg) => <div className={styles.error}>{msg}</div>}
      </ErrorMessage>
    </Grid>
  );
};

const QuickQuote = () => {
  const { clientWidth } =
    useContext<ClientWidthContextType>(ClientWidthContext);
  const {
    quickQuoteViewStatus,
    setQuickQuoteViewStatus,
    quickQuoteTitle,
    setQuickQuoteTitle,
    setQuickQuoteRequested,
  } = useContext<QuickQuoteContextType>(QuickQuoteContext);

  const quickQuoteRef = React.useRef<HTMLDivElement | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
  };

  React.useEffect(() => {
    if (clientWidth && clientWidth > 600) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clientWidth]);

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
        send_to: "AW-11248564671/tcj2CLn8kKoaEL_z3fMp",
        event_callback: callback,
      });
    } else {

    }
  };

  return (
    <div ref={quickQuoteRef}>
      {quickQuoteViewStatus && (
        <Formik
          initialValues={{
            usageType: "",
            products: [],
            deliveryDate: "",
            pickupDate: "",
            street: "",
            zip: "",
            city: "",
            state: "",
            instructions: "",
            fName: "",
            lName: "",
            cName: "",
            email: "",
            phone: "",
            contactPersonName: "",
            contactPersonPhone: "",
          }}
          validationSchema={quickQuoteValidationSchema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setQuickQuoteViewStatus(false);
            try {
              createLead({ ...values, leadSource: "Web Quick Lead" });
              setShowSuccessModal(true);
              setQuickQuoteRequested(true);
              handleLeadConversion();
            } catch (err) {

            }
            resetForm({
              values: {
                usageType: "",
                products: [],
                deliveryDate: "",
                pickupDate: "",
                street: "",
                zip: "",
                city: "",
                state: "",
                instructions: "",
                fName: "",
                lName: "",
                cName: "",
                email: "",
                phone: "",
                contactPersonName: "",
                contactPersonPhone: "",
              },
            });
          }}
        >
          <div
            className={styles.overlay}
            style={{
              display: quickQuoteViewStatus ? "block" : "none",
            }}
          >
            <Form>
              <AnimationWrapper
                effect={animations?.zoomOutAndZoomIn}
                animationKey={String(quickQuoteViewStatus)}
                className={styles.quickQuoteform}
              >
                <div>
                  <CloseIcon
                    size={24}
                    className={styles.closeIcon}
                    onClick={() => {
                      setQuickQuoteViewStatus(false);
                      setQuickQuoteTitle("Quick Quote");
                    }}
                  />
                  <Grid
                    container
                    spacing={0.5}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <div>
                        <h2>{quickQuoteTitle}</h2>
                      </div>
                    </Grid>
                    <UsageTypeField />
                    <Grid
                      item
                      xs={12}
                    >
                      <MyMultipleSelectCheckmarks
                        label="Select Portable Units"
                        name="products"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <MyDateField
                        label="Delivery Date"
                        className={styles.date}
                        name="deliveryDate"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <MyDateField
                        className={styles.date}
                        label="Pickup Date"
                        name="pickupDate"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <MyZipTextField
                        label="Zip"
                        name="zip"
                        placeholder="Zip"
                        min={0}
                        maxLength={5}
                        inputMode="numeric"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <MyTextField
                        label="Street Address"
                        name="street"
                        placeholder="Street Address (Optional)"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <MyTextField
                        label="First Name"
                        name="fName"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <MyTextField
                        label="Last Name"
                        name="lName"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <MyTextField
                        label="Email"
                        name="email"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <MyPhoneTextField
                        label="Phone"
                        name="phone"
                        placeholder="Phone"
                        type="tel"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <MyMultilineTextField
                        label="Instructions (if any)"
                        name="instructions"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                    >
                      <Button
                        variant="contained"
                        style={{
                          background: "var(--primary-bg-color)",
                          borderRadius: 0,
                        }}
                        endIcon={<SendIcon size={18} />}
                        type="submit"
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </AnimationWrapper>
            </Form>
          </div>
        </Formik>
      )}

      <QuickQuoteButton />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Thank You!"
        message="Your quick quote request has been received successfully."
        submessage="One of our representatives will contact you within 24 hours."
      />
    </div>
  );
};

export default QuickQuote;
