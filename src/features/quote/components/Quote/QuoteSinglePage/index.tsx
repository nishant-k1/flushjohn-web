"use client";

import React from "react";
import { Formik, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import {
  QuoteContext,
  initialQuoteValues,
} from "@/features/quote/contexts/QuoteContext";
import NumberField from "../FormFields/NumberField";
import TextField from "../FormFields/TextField";
import MultilineTextField from "../FormFields/MultilineTextField";
import ZipTextField from "../FormFields/ZipField";
import PhoneField from "../FormFields/PhoneField";
import DateInput from "@/components/FormControls/DateInput";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import { api } from "@/utils/apiClient";
import { useFormAbandonmentTracking } from "@/hooks/useFormAbandonmentTracking";

// Construct Google Ads conversion values from env vars
const GOOGLE_ADS_CONVERSION_QUOTE_FORM = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_QUOTE_PAGE_FORM_SUFFIX}`;
const GOOGLE_ADS_CONVERSION_VALUE_QUOTE_FORM = parseFloat(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_QUOTE_PAGE_FORM!
);
const GOOGLE_ADS_CONVERSION_CURRENCY =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY!;

// Combined validation schema
const combinedValidationSchema = Yup.object({
  usageType: Yup.string().required("Usage type is required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        item: Yup.string(),
        desc: Yup.string(),
        quantity: Yup.string()
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
          return parseInt(product.quantity || "0", 10) > 0;
        });
      }
    ),
  deliveryDate: Yup.string().required("Delivery date is required"),
  pickupDate: Yup.string().required("Pickup date is required"),
  streetAddress: Yup.string().required("Street address is required"),
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
  contactPersonName: Yup.string().required("Contact person name is required"),
  contactPersonPhone: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Contact person phone is required"),
});

const UsageTypeDropdown = () => {
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
    <div className={styles.usageTypeDropdown}>
      <div className={styles.fieldRow}>
        <label className={styles.field_label}>
          Usage Type
          <span style={{ color: "var(--error-border)", fontSize: "x-large" }}>
            {" "}
            *
          </span>
        </label>
        <div ref={dropdownRef} className={styles.dropdownContainer}>
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
              padding: "4px 12px",
              border: hasError
                ? `1px solid var(--error-border)`
                : `1px solid var(--border-light)`,
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
                color: values.usageType
                  ? "var(--text-form-value)"
                  : "var(--text-form-placeholder)",
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
                background: "var(--bg-white)",
                border: `1px solid var(--primary)`,
                borderRadius: "0",
                marginTop: "0",
                maxHeight: "280px",
                overflowY: "auto",
                zIndex: 10000,
                boxShadow: `0 12px 48px var(--black-alpha-25), 0 6px 20px var(--black-alpha-15)`,
                padding: "4px 0",
              }}
            >
              {options.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  style={{
                    padding: "6px 16px",
                    cursor: "pointer",
                    background:
                      values.usageType === option.value
                        ? "var(--primary-alpha-12)"
                        : "var(--bg-white)",
                    borderBottom:
                      index < options.length - 1
                        ? `1px solid var(--border-lighter)`
                        : "none",
                    borderLeft:
                      values.usageType === option.value
                        ? `4px solid var(--primary)`
                        : "4px solid transparent",
                    transition: "all 0.15s ease",
                    fontSize: "14px",
                    fontWeight: values.usageType === option.value ? 600 : 500,
                    color:
                      values.usageType === option.value
                        ? "var(--primary)"
                        : "var(--text-dark)",
                    borderRadius: "0",
                  }}
                  onMouseEnter={(e) => {
                    if (values.usageType !== option.value) {
                      e.currentTarget.style.background = "var(--bg-lighter)";
                      e.currentTarget.style.borderLeft = `4px solid var(--primary-alpha-30)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (values.usageType !== option.value) {
                      e.currentTarget.style.background = "var(--bg-white)";
                      e.currentTarget.style.borderLeft =
                        "4px solid transparent";
                    }
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
          {showError && hasError && (
            <div className={styles.error}>
              {hasError
                ? typeof errors.usageType === "string"
                  ? errors.usageType
                  : String(errors.usageType || "")
                : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuoteSinglePage = () => {
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const { data, setQuoteRequested } = useContext(QuoteContext);
  const [formValues, setFormValues] = data;
  const { products } = formValues;

  // Form abandonment tracking
  const { trackFieldInteraction, trackComplete } = useFormAbandonmentTracking({
    formType: "quote_page_form",
    totalFields: 15,
    initialStep: 1,
  });

  const handleLeadConversion = () => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function" &&
      GOOGLE_ADS_CONVERSION_QUOTE_FORM
    ) {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSION_QUOTE_FORM,
        value: GOOGLE_ADS_CONVERSION_VALUE_QUOTE_FORM,
        currency: GOOGLE_ADS_CONVERSION_CURRENCY,
      });
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        validationSchema={combinedValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          // Show success immediately (optimistic update)
          setShowSuccessModal(true);
          setQuoteRequested(true);
          trackComplete();
          handleLeadConversion();

          try {
            const finalData = {
              ...formValues,
              ...values,
              leadSource: "Web Lead",
            };

            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
            await api.post(`${API_BASE_URL}/leads`, finalData);
          } catch (err) {
            if (process.env.NODE_ENV === "development") {
              console.error("Error submitting lead:", err);
            }
            setShowSuccessModal(false);
            setQuoteRequested(false);
            setShowErrorModal(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <div className={styles.form}>
              {/* Requirement Details Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Requirement Details</h3>
                <UsageTypeDropdown />
                {products.map((item, index) => (
                  <NumberField
                    key={item.id || index}
                    label={item.item}
                    name={`products[${index}].quantity`}
                    mask="9999"
                    type="tel"
                  />
                ))}
                <ErrorMessage name="products">
                  {(msg) => {
                    return (
                      <div className={styles.productsError}>
                        Enter quantity for at least one item
                      </div>
                    );
                  }}
                </ErrorMessage>
              </div>

              {/* Delivery Details Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Delivery Details</h3>
                <DateInput
                  label="Delivery Date"
                  name="deliveryDate"
                  placeholder="Select delivery date"
                  required
                />
                <DateInput
                  label="Pickup Date"
                  name="pickupDate"
                  placeholder="Select pickup date"
                  required
                />
                <TextField
                  label="Street"
                  name="streetAddress"
                  placeholder="Enter street address"
                  required
                />
                <ZipTextField label="Zip Code" name="zip" />
                <TextField label="City" name="city" placeholder="Enter city" />
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

              {/* Personal Details Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Personal Details</h3>
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
                  autoComplete="tel"
                  placeholder="Enter contact phone"
                />
              </div>

              {/* Submit Button */}
              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending
                    </>
                  ) : (
                    "Send Quote Request"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setFormValues(initialQuoteValues);
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

export default QuoteSinglePage;
