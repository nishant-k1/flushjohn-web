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
import { SendIcon } from "@/components/UI/Icons";
import * as Yup from "yup";
import { ClientWidthContext } from "@/contexts/ClientWidthContext";
import { logEvent } from "../../../react-ga4-config";
import { ClientWidthContextType } from "@/contexts/ClientWidthContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { createSocket } from "@/utils/socketClient";
import type { Socket } from "socket.io-client";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import {
  QuickQuoteContext,
  QuickQuoteContextType,
} from "@/features/quote/contexts/QuickQuoteContext";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

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
    // Show error only after field is touched (blurred) and there's an error
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
        // Mark as touched when clicking outside (equivalent to blur)
        setFieldTouched("usageType", true);
        // Only hide error if field is not touched yet
        // If field is touched and has error, keep showing it
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
    <Grid
      item
      xs={12}
    >
      <div
        ref={dropdownRef}
        style={{ position: "relative", width: "100%" }}
        className={styles.usageTypeContainer}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            // Hide error when field is focused/clicked
            setShowError(false);
            // Don't set touched on click - only on blur or after selection
          }}
          onBlur={() => {
            setFieldTouched("usageType", true);
          }}
          className={hasError ? styles.error_field : ""}
          style={{
            padding: "0 12px",
            border: hasError ? "1px solid #ff4444" : "1px solid #d9d9d9",
            borderRadius: "0",
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
              background: "#ffffff" /* White background for clean look */,
              border: "1px solid var(--primary-bg-color, #8c6f48)",
              borderRadius: "0",
              marginTop: "0", /* No gap - dropdown appears directly below input */
              maxHeight: "280px",
              overflowY: "auto",
              zIndex: 10000,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(140, 111, 72, 0.15)",
              padding: "4px 0",
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
                      ? "rgba(140, 111, 72, 0.12)" /* Subtle selected background */
                      : "#ffffff" /* White background for better contrast */,
                  borderBottom: index < options.length - 1 ? "1px solid #e8e8e8" : "none",
                  borderLeft:
                    values.usageType === option.value
                      ? "4px solid var(--primary-bg-color, #8c6f48)"
                      : "4px solid transparent",
                  transition: "all 0.15s ease",
                  fontSize: "15px",
                  fontWeight: values.usageType === option.value ? 600 : 500,
                  color:
                    values.usageType === option.value
                      ? "var(--primary-bg-color, #8c6f48)"
                      : "#1a1a1a",
                  margin: index < options.length - 1 ? "0 0 2px 0" : "0",
                  borderRadius: "0",
                  boxShadow: values.usageType === option.value
                    ? "inset 0 0 0 1px rgba(140, 111, 72, 0.1)"
                    : "none",
                  lineHeight: "1.4",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background = "#f8f9fa";
                    e.currentTarget.style.borderLeft = "4px solid rgba(140, 111, 72, 0.3)";
                    e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(140, 111, 72, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (values.usageType !== option.value) {
                    e.currentTarget.style.background = "#ffffff";
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
        <div className={`${styles.error} ${showError && hasError ? styles.errorVisible : styles.errorHidden}`}>
          {hasError ? (typeof errors.usageType === "string" ? errors.usageType : String(errors.usageType || "")) : ""}
        </div>
      </div>
    </Grid>
  );
};

const HeroQuickQuote = () => {
  const { clientWidth } =
    useContext<ClientWidthContextType>(ClientWidthContext);
  const [heroQuickQuoteViewStatus, setHeroQuickQuoteViewStatus] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const { setQuickQuoteRequested } =
    useContext<QuickQuoteContextType>(QuickQuoteContext);

  React.useEffect(() => {
    if (clientWidth && clientWidth > 600) {
      setHeroQuickQuoteViewStatus(true);
    }
  }, [clientWidth]);

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
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const setSubmittingRef = React.useRef<
    ((isSubmitting: boolean) => void) | null
  >(null);
  const pendingLeadDataRef = React.useRef<any>(null);

  // Set up socket event listeners
  React.useEffect(() => {
    const currentSocket = socketRef.current;
    if (currentSocket) {
      currentSocket.on("connect", () => {
        // Socket connected - no logging needed in production
      });

      currentSocket.on("disconnect", () => {
        // Socket disconnected - no logging needed in production
      });

      currentSocket.on("connect_error", (error) => {
        // Only log critical socket errors in development
        if (process.env.NODE_ENV === "development") {
          console.error("Socket connection error:", error);
        }
      });

      currentSocket.on("leadCreated", (response) => {
        if (submitInProgressRef.current) {
          // Socket ALWAYS wins - even if HTTP was called as fallback
          // Mark socket as succeeded to prevent HTTP from completing
          socketSucceededRef.current = true;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setShowSuccessModal(true);
          setQuickQuoteRequested(true);
          handleLeadConversion();
          submitInProgressRef.current = false;
          httpCalledRef.current = false; // Reset for next submission
          if (setSubmittingRef.current) {
            setSubmittingRef.current(false);
          }
          setIsSubmittingLocal(false);
          pendingLeadDataRef.current = null;
        }
      });

      currentSocket.on("leadCreationError", (error) => {
        if (submitInProgressRef.current && !socketSucceededRef.current && !httpCalledRef.current) {
          // Socket failed, allow HTTP fallback (only if HTTP wasn't already called)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          // Try HTTP fallback if we have pending data
          if (pendingLeadDataRef.current) {
            httpCalledRef.current = true; // Mark HTTP as called
            createLeadViaHTTP(pendingLeadDataRef.current)
              .then(() => {
                // Only process HTTP success if socket hasn't already succeeded
                if (!socketSucceededRef.current && submitInProgressRef.current) {
                  setShowSuccessModal(true);
                  setQuickQuoteRequested(true);
                  handleLeadConversion();
                  submitInProgressRef.current = false;
                  httpCalledRef.current = false; // Reset for next submission
                  if (setSubmittingRef.current) {
                    setSubmittingRef.current(false);
                  }
                  setIsSubmittingLocal(false);
                  pendingLeadDataRef.current = null;
                }
                // If socket succeeded, ignore HTTP result (socket wins)
              })
              .catch(() => {
                // Only show error if socket hasn't already succeeded
                if (!socketSucceededRef.current && submitInProgressRef.current) {
                  setShowErrorModal(true);
                  submitInProgressRef.current = false;
                  httpCalledRef.current = false; // Reset on error
                  if (setSubmittingRef.current) {
                    setSubmittingRef.current(false);
                  }
                  setIsSubmittingLocal(false);
                  pendingLeadDataRef.current = null;
                }
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
  }, [setQuickQuoteRequested]);

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

  const handleLeadConversion = (url?: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      const callback = () => {
        if (url) {
          window.location.href = url;
        }
      };

      window.gtag("event", "conversion", {
        send_to: "AW-11248564671/6KpkCNjzpaoaEL_z3fMp",
        event_callback: callback,
      });
    } else {
    }
  };

  return (
    <>
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
          // CRITICAL: Early return if submission is already in progress (prevents duplicate submissions)
          if (submitInProgressRef.current) {
            console.warn("Submission already in progress, ignoring duplicate submit");
            return;
          }

          // Set local submitting state immediately to show spinner
          setIsSubmittingLocal(true);

          // Store setSubmitting in ref so socket handlers can access it
          setSubmittingRef.current = setSubmitting;

          // Set submitting to true immediately to show spinner
          setSubmitting(true);
          submitInProgressRef.current = true;

          try {
            const finalData = { ...values, leadSource: "Web Hero Quick Lead" };

            // Reset flags for new submission
            socketSucceededRef.current = false;
            httpCalledRef.current = false; // Reset HTTP flag
            pendingLeadDataRef.current = finalData;

            // Clear any existing timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            // Try socket first
            if (socketRef.current && socketRef.current.connected) {
              socketRef.current.emit("createLead", finalData);
              // Wait for socket response (handled by event listeners)
              // Set a timeout to fallback to HTTP if no response
              timeoutRef.current = setTimeout(() => {
                // Only fallback to HTTP if socket hasn't succeeded
                if (
                  submitInProgressRef.current &&
                  !socketSucceededRef.current &&
                  !httpCalledRef.current
                ) {
                  // Mark HTTP as called to prevent socket from creating duplicate
                  // Mark HTTP as called (but socket can still win if it responds)
                  httpCalledRef.current = true;
                  // Socket didn't respond, try HTTP as fallback
                  createLeadViaHTTP(finalData)
                    .then(() => {
                      // Only process HTTP success if socket hasn't already succeeded
                      if (!socketSucceededRef.current && submitInProgressRef.current) {
                        setShowSuccessModal(true);
                        setQuickQuoteRequested(true);
                        handleLeadConversion();
                        submitInProgressRef.current = false;
                        httpCalledRef.current = false; // Reset for next submission
                        timeoutRef.current = null;
                        setSubmitting(false);
                        setIsSubmittingLocal(false);
                        pendingLeadDataRef.current = null;
                      }
                      // If socket succeeded, ignore HTTP result (socket wins)
                    })
                    .catch(() => {
                      // Only show error if socket hasn't already succeeded
                      if (!socketSucceededRef.current && submitInProgressRef.current) {
                        setShowErrorModal(true);
                        submitInProgressRef.current = false;
                        httpCalledRef.current = false; // Reset on error
                        timeoutRef.current = null;
                        setSubmitting(false);
                        setIsSubmittingLocal(false);
                        pendingLeadDataRef.current = null;
                      }
                    });
                }
              }, 5000); // 5 second timeout for socket
            } else {
              // Socket not connected, try to connect and emit, or use HTTP
              socketRef.current?.connect();
              timeoutRef.current = setTimeout(() => {
                if (socketRef.current?.connected) {
                  socketRef.current.emit("createLead", finalData);
                  // Set timeout for HTTP fallback
                  const fallbackTimeout = setTimeout(() => {
                    // Only fallback to HTTP if socket hasn't succeeded
                    if (
                      submitInProgressRef.current &&
                      !socketSucceededRef.current &&
                      !httpCalledRef.current
                    ) {
                      // Mark HTTP as called to prevent socket from creating duplicate
                      // Mark HTTP as called (but socket can still win if it responds)
                      httpCalledRef.current = true;
                      createLeadViaHTTP(finalData)
                        .then(() => {
                          // Only process HTTP success if socket hasn't already succeeded
                          if (!socketSucceededRef.current && submitInProgressRef.current) {
                            setHeroQuickQuoteViewStatus(false);
                            setShowSuccessModal(true);
                            setQuickQuoteRequested(true);
                            handleLeadConversion();
                            submitInProgressRef.current = false;
                            httpCalledRef.current = false; // Reset for next submission
                            timeoutRef.current = null;
                            setIsSubmittingLocal(false);
                            pendingLeadDataRef.current = null;
                          }
                          // If socket succeeded, ignore HTTP result (socket wins)
                        })
                        .catch(() => {
                          // Only show error if socket hasn't already succeeded
                          if (!socketSucceededRef.current && submitInProgressRef.current) {
                            setShowErrorModal(true);
                            submitInProgressRef.current = false;
                            httpCalledRef.current = false; // Reset on error
                            timeoutRef.current = null;
                            setSubmitting(false);
                            setIsSubmittingLocal(false);
                            pendingLeadDataRef.current = null;
                          }
                        });
                    }
                  }, 5000);
                  timeoutRef.current = fallbackTimeout;
                } else {
                  // Socket failed, use HTTP (only if not already called)
                  if (!httpCalledRef.current) {
                    // Mark HTTP as called (but socket can still win if it responds)
                    httpCalledRef.current = true;
                    createLeadViaHTTP(finalData)
                      .then(() => {
                        // Only process HTTP success if socket hasn't already succeeded
                        if (!socketSucceededRef.current && submitInProgressRef.current) {
                          setShowSuccessModal(true);
                          setQuickQuoteRequested(true);
                          handleLeadConversion();
                          submitInProgressRef.current = false;
                          httpCalledRef.current = false; // Reset for next submission
                          timeoutRef.current = null;
                          setSubmitting(false);
                          setIsSubmittingLocal(false);
                          pendingLeadDataRef.current = null;
                        }
                        // If socket succeeded, ignore HTTP result (socket wins)
                      })
                      .catch(() => {
                        // Only show error if socket hasn't already succeeded
                        if (!socketSucceededRef.current && submitInProgressRef.current) {
                          setShowErrorModal(true);
                          submitInProgressRef.current = false;
                          httpCalledRef.current = false; // Reset on error
                          timeoutRef.current = null;
                          setSubmitting(false);
                          setIsSubmittingLocal(false);
                          pendingLeadDataRef.current = null;
                        }
                      });
                  }
                }
              }, 1000);
            }
          } catch (err) {
            if (process.env.NODE_ENV === "development") {
              console.error("Error submitting lead:", err);
            }
            setShowErrorModal(true);
            submitInProgressRef.current = false;
            httpCalledRef.current = false; // Reset on error
            setSubmitting(false);
            pendingLeadDataRef.current = null;
          } finally {
            // Clear the ref
            setSubmittingRef.current = null;
            // Reset submitting if not already handled by async operations
            if (!submitInProgressRef.current) {
              setSubmitting(false);
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
          }
        }}
      >
        {({ isSubmitting }) => {
          const showSpinner = isSubmittingLocal || isSubmitting;
          return (
            <div
              className={styles.overlay}
              style={{
                display: heroQuickQuoteViewStatus ? "block" : "none",
              }}
            >
              <Form>
                <AnimationWrapper
                  effect={animations?.zoomOutAndZoomIn}
                  animationKey={String(heroQuickQuoteViewStatus)}
                  className={styles.quickQuoteform}
                >
                  <Grid
                    container
                    spacing={0.5}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <div>
                        <h2>Get My Free Quote</h2>
                      </div>
                    </Grid>
                    <UsageTypeField />
                    <Grid
                      item
                      xs={12}
                    >
                      <MyMultipleSelectCheckmarks
                        label="Select Items"
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
                        loading={showSpinner}
                        disabled={showSpinner}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </AnimationWrapper>
              </Form>
            </div>
          );
        }}
      </Formik>

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
    </>
  );
};

export default HeroQuickQuote;
