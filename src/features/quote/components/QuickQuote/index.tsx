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
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import { api } from "@/utils/apiClient";
// Construct Google Ads conversion values from env vars (same as all quote forms)
const GOOGLE_ADS_CONVERSION_QUOTE_FORM = `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SITE_WIDE_QUOTE_REQUEST_FORM_SUFFIX}`;
const GOOGLE_ADS_CONVERSION_VALUE_QUOTE_FORM = parseFloat(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_VALUE_MODAL_QUICK_QUOTE_FORM!
);
const GOOGLE_ADS_CONVERSION_CURRENCY =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CURRENCY!;
import { useFormAbandonmentTracking } from "@/hooks/useFormAbandonmentTracking";

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
          className={`${styles.usageTypeTrigger} ${hasError ? styles.errorBorder : ""}`}
        >
          <span
            className={styles.usageTypeValue}
            style={{
              color: values.usageType
                ? "var(--text-form-value)"
                : "var(--text-form-placeholder)",
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
              border: `1px solid var(--primary-bg-color, var(--primary))`,
              borderRadius: "0",
              marginTop: "0",
              maxHeight: "280px",
              overflowY: "auto",
              zIndex: 10000,
              boxShadow: `0 12px 48px var(--black-alpha-25), 0 6px 20px var(--black-alpha-15), 0 0 0 1px var(--primary-alpha-20)`,
              padding: "4px 0",
              animation:
                "datePickerSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
                      ? `4px solid var(--primary-bg-color, var(--primary))`
                      : "4px solid transparent",
                  transition: "all 0.15s ease",
                  fontSize: "14px",
                  fontWeight: values.usageType === option.value ? 600 : 500,
                  color:
                    values.usageType === option.value
                      ? "var(--primary-bg-color, var(--primary))"
                      : "var(--text-dark)",
                  margin: index < options.length - 1 ? "0 0 2px 0" : "0",
                  borderRadius: "0",
                  boxShadow:
                    values.usageType === option.value
                      ? `inset 0 0 0 1px var(--primary-alpha-10)`
                      : "none",
                  lineHeight: "1.2",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background = "var(--bg-lighter)";
                    e.currentTarget.style.borderLeft = `4px solid var(--primary-alpha-30)`;
                    e.currentTarget.style.boxShadow = `inset 0 0 0 1px var(--primary-alpha-08)`;
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
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hasShownScrollPopup, setHasShownScrollPopup] = useState(false);
  const [modalHeight, setModalHeight] = useState<string>("92vh");

  // Form abandonment tracking
  const { trackComplete } = useFormAbandonmentTracking({
    formType: "modal_quick_quote_form",
    totalFields: 12, // All form fields
  });

  // Handle click outside modal to close it
  const handleClickOutside = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Only close if clicking directly on the overlay (gap area), not on the form
      if (event.target === overlayRef.current) {
        setQuickQuoteViewStatus(false);
        setQuickQuoteTitle("Quick Quote");
      }
    },
    [setQuickQuoteViewStatus, setQuickQuoteTitle]
  );

  // Calculate dynamic viewport height for mobile modals
  const calculateModalHeight = React.useCallback(() => {
    if (typeof window === "undefined") return;

    // Prefer Visual Viewport API if available (more accurate for mobile)
    let viewportHeight = window.innerHeight;
    
    // @ts-ignore - Visual Viewport API might not be in types yet
    if (window.visualViewport) {
      // Visual Viewport API gives the actual visible viewport (excludes keyboard)
      // @ts-ignore
      viewportHeight = window.visualViewport.height;
    } else {
      // Fallback to window.innerHeight
      viewportHeight = window.innerHeight;
    }
    
    // Use 92% of viewport height (no gap - fills most of viewport)
    const calculatedHeight = Math.round(viewportHeight * 0.92);
    
    // Ensure minimum height for usability (at least 400px)
    const finalHeight = Math.max(calculatedHeight, 400);
    
    // Set as pixel value for consistency
    setModalHeight(`${finalHeight}px`);
    
    // Also set CSS custom property for the form element
    if (formRef.current) {
      const element = formRef.current as HTMLDivElement;
      if (element) {
        element.style.setProperty("--modal-height", `${finalHeight}px`);
      }
    }

    // Overlay should always cover full viewport
    if (overlayRef.current) {
      overlayRef.current.style.height = `${viewportHeight}px`;
      overlayRef.current.style.maxHeight = `${viewportHeight}px`;
    }
  }, []);

  // Update modal height when it opens and on viewport changes
  React.useEffect(() => {
    if (!quickQuoteViewStatus) return;

    // Calculate height immediately when modal opens (using requestAnimationFrame for accuracy)
    requestAnimationFrame(() => {
      calculateModalHeight();
      // Second calculation after a brief delay to catch any viewport stabilization
      setTimeout(calculateModalHeight, 50);
    });

    // Recalculate on resize (handles orientation changes, keyboard, etc.)
    const handleResize = () => {
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        // Small delay to ensure viewport has stabilized (especially for keyboard)
        setTimeout(calculateModalHeight, 100);
      });
    };

    // Recalculate on orientation change
    const handleOrientationChange = () => {
      requestAnimationFrame(() => {
        setTimeout(calculateModalHeight, 200);
      });
    };

    // Visual Viewport API listener (most accurate for mobile viewport changes)
    // @ts-ignore
    const visualViewport = window.visualViewport;
    // @ts-ignore
    const handleVisualViewportChange = visualViewport
      ? () => {
          requestAnimationFrame(calculateModalHeight);
        }
      : null;

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    
    // Add Visual Viewport listener if available
    if (visualViewport && handleVisualViewportChange) {
      visualViewport.addEventListener("resize", handleVisualViewportChange);
      visualViewport.addEventListener("scroll", handleVisualViewportChange);
    }
    
    // Recalculate after delays to catch address bar and keyboard changes
    const timeoutId1 = setTimeout(calculateModalHeight, 150);
    const timeoutId2 = setTimeout(calculateModalHeight, 300);
    const timeoutId3 = setTimeout(calculateModalHeight, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      
      if (visualViewport && handleVisualViewportChange) {
        visualViewport.removeEventListener("resize", handleVisualViewportChange);
        visualViewport.removeEventListener("scroll", handleVisualViewportChange);
      }
      
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [quickQuoteViewStatus, calculateModalHeight]);

  // COMMENTED OUT: Auto-show modal on scroll at 300px
  // React.useEffect(() => {
  //   if (hasShownScrollPopup || quickQuoteViewStatus) return;

  //   const handleScroll = () => {
  //     // Show modal after scrolling 300px (same as StickyCTA)
  //     if (window.scrollY > 300 && !hasShownScrollPopup) {
  //       setTimeout(() => {
  //         setQuickQuoteViewStatus(true);
  //         setQuickQuoteTitle("Get Your Free Quote!");
  //         setHasShownScrollPopup(true);
  //       }, 500);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasShownScrollPopup, quickQuoteViewStatus, setQuickQuoteViewStatus, setQuickQuoteTitle]);

  // Remove old desktop click-outside handler - we handle it via overlay onClick now

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
    <div ref={quickQuoteRef}>
      {quickQuoteViewStatus && (
        <Formik
          initialValues={{
            usageType: "",
            products: [],
            deliveryDate: "",
            pickupDate: "",
            streetAddress: "",
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
            trackComplete(); // Track form completion
            handleLeadConversion();
            resetForm();

            try {
              // Data is automatically serialized by apiClient
              const finalData = {
                ...values,
                leadSource: "Web Quick Lead",
              };

              // API request in background (non-blocking)
              const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
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
                ref={overlayRef}
                className={styles.overlay}
                style={{
                  display: quickQuoteViewStatus ? "flex" : "none",
                }}
                onClick={handleClickOutside}
              >
                <Form>
                  <AnimationWrapper
                    effect={animations?.zoomOutAndZoomIn}
                    animationKey={String(quickQuoteViewStatus)}
                    className={styles.quickQuoteform}
                    ref={formRef}
                    style={
                      typeof window !== "undefined" && window.innerWidth <= 768
                        ? { height: modalHeight, maxHeight: modalHeight }
                        : undefined
                    }
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      // Prevent clicks on form from closing the modal
                      e.stopPropagation();
                    }}
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
                            name="streetAddress"
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
                            Submit
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
