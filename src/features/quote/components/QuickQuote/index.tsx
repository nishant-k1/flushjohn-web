"use client";

import { Formik, Form, useFormikContext } from "formik";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import MyMultipleSelectCheckmarks from "@/components/FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "@/components/FormControls/MyTextField";
import DateInput from "@/components/FormControls/DateInput";
import MyPhoneTextField from "@/components/FormControls/MyPhoneTextField";
import MyMultilineTextField from "@/components/FormControls/MyMultilineTextField";
import Button from "@/components/UI/Button";
import Grid from "@/components/UI/Grid";
import { SendIcon, CloseIcon } from "@/components/UI/Icons";
import * as Yup from "yup";
import QuickQuoteButton from "./QuickQuoteButton";
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext";
import { ClientWidthContext } from "@/contexts/ClientWidthContext";
import { ClientWidthContextType } from "@/contexts/ClientWidthContext";
import { QuickQuoteContextType } from "../../contexts/QuickQuoteContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import { api } from "@/utils/apiClient";

const quickQuoteValidationSchema = Yup.object().shape({
  usageType: Yup.string().required("Required"),
  products: Yup.array().min(1, "Required").required("Required"),
  deliveryDate: Yup.string().required("Required"),
  pickupDate: Yup.string().required("Required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "Required")
    .required("Required"),
  fName: Yup.string().min(2, "Required").required("Required"),
  email: Yup.string().email("Required").required("Required"),
  phone: Yup.string().min(10, "Required").required("Required"),
  lName: Yup.string(),
  instructions: Yup.string(),
});

const UsageTypeField = () => {
  const { errors, touched, values, setFieldValue, setFieldTouched } =
    useFormikContext<any>();
  const hasError = touched.usageType && errors.usageType;
  const [isOpen, setIsOpen] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const options = [
    { label: "Event", value: "event" },
    { label: "Construction", value: "construction" },
    { label: "Emergency", value: "emergency" },
    { label: "Renovation", value: "renovation" },
  ];

  React.useEffect(() => {
    if (hasError) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [hasError]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.closest(".custom-datepicker") ||
        target.closest(".react-datepicker-popper")
      ) {
        return;
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFieldTouched("usageType", true);
        if (!touched.usageType) {
          setShowError(false);
        }
      }
    };

    if (isOpen || showError) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showError, touched.usageType, setFieldTouched]);

  const handleSelect = async (value: string) => {
    await setFieldValue("usageType", value);
    setFieldTouched("usageType", true);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === values.usageType);

  return (
    <Grid item xs={12}>
      <div
        ref={dropdownRef}
        style={{ position: "relative", width: "100%" }}
        className={styles.usageTypeContainer}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setShowError(false);
          }}
          onBlur={() => {
            setFieldTouched("usageType", true);
          }}
          className={hasError ? styles.error_field : ""}
          style={{
            padding: "0 12px",
            border: hasError ? `1px solid var(--error-border)` : `1px solid var(--border-light)`,
            borderRadius: "0",
            cursor: "pointer",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-white)",
            transition: "border-color 0.2s",
          }}
        >
          <span
            style={{
              color: values.usageType ? "var(--text-form-value)" : "var(--text-form-placeholder)",
              fontSize: "14px",
              fontWeight: 500,
              flex: 1,
            }}
          >
            {selectedOption ? selectedOption.label : "Select Usage Type"}
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
              background: "var(--bg-light)",
              border: `2px solid var(--primary-bg-color, var(--primary))`,
              borderRadius: "0",
              marginTop: "8px",
              maxHeight: "280px",
              overflowY: "auto",
              zIndex: 10000,
              boxShadow: `0 4px 16px var(--primary-alpha-15)`,
              padding: "4px 0",
              animation:
                "dropdownSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  background:
                    values.usageType === option.value
                      ? "var(--primary-alpha-12)"
                      : "var(--bg-white)",
                  borderBottom:
                    index < options.length - 1 ? `1px solid var(--border-lighter)` : "none",
                  borderLeft:
                    values.usageType === option.value
                      ? `4px solid var(--primary-bg-color, var(--primary))`
                      : "4px solid transparent",
                  transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  fontSize: "15px",
                  fontWeight: values.usageType === option.value ? 600 : 500,
                  color:
                    values.usageType === option.value
                      ? "var(--primary-bg-color, var(--primary))"
                      : "var(--text-dark)",
                  margin: index < options.length - 1 ? "0 0 2px 0" : "0",
                  borderRadius: "0",
                  boxShadow:
                    values.usageType === option.value
                      ? `0 0 12px var(--primary-alpha-20)`
                      : "none",
                  lineHeight: "1.4",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background =
                      `linear-gradient(90deg, var(--primary-alpha-12) 0%, var(--primary-alpha-06) 100%)`;
                    e.currentTarget.style.borderLeft = `4px solid var(--primary-alpha-30)`;
                    e.currentTarget.style.boxShadow = `0 2px 10px var(--primary-alpha-10)`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background = "var(--bg-white)";
                    e.currentTarget.style.borderLeft = "4px solid transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <div
          className={`${styles.error} ${showError && hasError ? styles.errorVisible : styles.errorHidden}`}
        >
          {hasError
            ? typeof errors.usageType === "string"
              ? errors.usageType
              : String(errors.usageType || "")
            : ""}
        </div>
      </div>
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
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {};

  React.useEffect(() => {
    if (clientWidth && clientWidth > 600) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clientWidth]);

  const { API_BASE_URL } = apiBaseUrls;

  const handleLeadConversion = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-11248564671/tcj2CLn8kKoaEL_z3fMp",
      });
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
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            // ✅ OPTIMISTIC: Show success immediately (before API response)
            setShowSuccessModal(true);
            setQuickQuoteRequested(true);
            handleLeadConversion();
            resetForm();

            try {
              // Data is automatically serialized by apiClient
              const finalData = {
                ...values,
                leadSource: "Web Quick Lead",
              };

              // API request in background (non-blocking)
              await api.post(`${API_BASE_URL}/leads`, finalData);
              // If successful, success modal is already shown ✅
            } catch (err) {
              if (process.env.NODE_ENV === "development") {
                console.error("Error submitting lead:", err);
              }
              // ✅ ROLLBACK: Revert optimistic updates on error
              setShowSuccessModal(false);
              setQuickQuoteRequested(false);
              setShowErrorModal(true);
              // Could optionally restore form with values if needed
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <div
              className={styles.overlay}
              style={{
                display: quickQuoteViewStatus ? "flex" : "none",
              }}
            >
              <Form>
                <AnimationWrapper
                  effect={animations?.zoomOutAndZoomIn}
                  animationKey={String(quickQuoteViewStatus)}
                  className={styles.quickQuoteform}
                >
                  <CloseIcon
                    size={24}
                    className={styles.closeIcon}
                    onClick={() => {
                      setQuickQuoteViewStatus(false);
                      setQuickQuoteTitle("Quick Quote");
                    }}
                  />
                  <div>
                    <Grid container spacing={0.5}>
                      <Grid item xs={12}>
                        <div>
                          <h2>{quickQuoteTitle}</h2>
                        </div>
                      </Grid>
                      <UsageTypeField />
                      <Grid item xs={12}>
                        <MyMultipleSelectCheckmarks
                          label="Select Items"
                          name="products"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateInput
                          label="Delivery Date"
                          name="deliveryDate"
                          required
                          variant="quickquote"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateInput
                          label="Pickup Date"
                          name="pickupDate"
                          required
                          variant="quickquote"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyZipTextField
                          label="Zip"
                          name="zip"
                          placeholder="Zip"
                          min={0}
                          maxLength={5}
                          inputMode="numeric"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextField
                          label="Street Address"
                          name="street"
                          placeholder="Street Address (Optional)"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MyTextField label="First Name" name="fName" />
                      </Grid>
                      <Grid item xs={6}>
                        <MyTextField label="Last Name" name="lName" />
                      </Grid>
                      <Grid item xs={12}>
                        <MyTextField label="Email" name="email" />
                      </Grid>
                      <Grid item xs={12}>
                        <MyPhoneTextField
                          label="Phone"
                          name="phone"
                          placeholder="Phone"
                          type="tel"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyMultilineTextField
                          label="Instructions (if any)"
                          name="instructions"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          style={{
                            background: "var(--primary-bg-color)",
                            borderRadius: 0,
                          }}
                          endIcon={<SendIcon size={18} />}
                          type="submit"
                          loading={isSubmitting}
                          disabled={isSubmitting}
                        >
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </AnimationWrapper>
              </Form>
            </div>
          )}
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
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Submission Failed"
        message="Failed to submit your quote request. Please try again."
        submessage="If the problem persists, please contact our support team."
      />
    </div>
  );
};

export default QuickQuote;
