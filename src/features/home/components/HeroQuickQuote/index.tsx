"use client";

import { Formik, Form } from "formik";
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
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import { ClientWidthContext } from "@/contexts/ClientWidthContext";
import MyRadioField from "@/components/FormControls/MyRadioField";
import { logEvent } from "../../../../../react-ga4-config";
import { ClientWidthContextType } from "@/contexts/ClientWidthContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { io, Socket } from "socket.io-client";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import {
  QuickQuoteContext,
  QuickQuoteContextType,
} from "@/features/quote/contexts/QuickQuoteContext";

const quickQuoteValidationSchema = Yup.object().shape({
  products: Yup.array().of(Yup.string().required("Required")),
  deliveryDate: Yup.string().required("Required"),
  pickupDate: Yup.string().required("Required"),
  zip: Yup.string().matches(/^\d{5}$/, "Zip code must be 5 digits").required("Required"),
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string().required("Required"),
  instructions: Yup.string(),
});

const HeroQuickQuote = () => {
  const { clientWidth } =
    useContext<ClientWidthContextType>(ClientWidthContext);
  const [heroQuickQuoteViewStatus, setHeroQuickQuoteViewStatus] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { setQuickQuoteRequested } =
    useContext<QuickQuoteContextType>(QuickQuoteContext);

  React.useEffect(() => {
    if (clientWidth && clientWidth > 600) {
      setHeroQuickQuoteViewStatus(true);
    }
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
  const submitInProgressRef = React.useRef(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Set up socket event listeners
  React.useEffect(() => {
    const currentSocket = socketRef.current;
    if (currentSocket) {
      currentSocket.on("connect", () => {
        console.log("Socket connected for Home HeroQuickQuote");
      });

      currentSocket.on("disconnect", () => {
        console.log("Socket disconnected for Home HeroQuickQuote");
      });

      currentSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      currentSocket.on("leadCreated", (response) => {
        if (submitInProgressRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setShowSuccessModal(true);
          setQuickQuoteRequested(true);
          handleLeadConversion();
          submitInProgressRef.current = false;
        }
      });

      currentSocket.on("leadCreationError", (error) => {
        if (submitInProgressRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setShowErrorModal(true);
          submitInProgressRef.current = false;
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

      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setHeroQuickQuoteViewStatus(false);
        try {
          const finalData = { ...values, leadSource: "Web Hero Quick Lead" };

          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          submitInProgressRef.current = true;
          setSubmitting(true);

          // Try socket first
          if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("createLead", finalData);
            // Wait for socket response (handled by event listeners)
            // Set a timeout to fallback to HTTP if no response
            timeoutRef.current = setTimeout(() => {
              if (submitInProgressRef.current) {
                // Socket didn't respond, try HTTP
                createLeadViaHTTP(finalData)
                  .then(() => {
                    setShowSuccessModal(true);
                    setQuickQuoteRequested(true);
                    handleLeadConversion();
                    submitInProgressRef.current = false;
                    timeoutRef.current = null;
                  })
                  .catch(() => {
                    setShowErrorModal(true);
                    submitInProgressRef.current = false;
                    timeoutRef.current = null;
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
                  if (submitInProgressRef.current) {
                    createLeadViaHTTP(finalData)
                      .then(() => {
                        setShowSuccessModal(true);
                        setQuickQuoteRequested(true);
                        handleLeadConversion();
                        submitInProgressRef.current = false;
                        timeoutRef.current = null;
                      })
                      .catch(() => {
                        setShowErrorModal(true);
                        submitInProgressRef.current = false;
                        timeoutRef.current = null;
                      });
                  }
                }, 5000);
                timeoutRef.current = fallbackTimeout;
              } else {
                // Socket failed, use HTTP
                createLeadViaHTTP(finalData)
                  .then(() => {
                    setShowSuccessModal(true);
                    setQuickQuoteRequested(true);
                    handleLeadConversion();
                    submitInProgressRef.current = false;
                    timeoutRef.current = null;
                  })
                  .catch(() => {
                    setShowErrorModal(true);
                    submitInProgressRef.current = false;
                    timeoutRef.current = null;
                  });
              }
            }, 1000);
          }
        } catch (err) {
          console.error("Error submitting lead:", err);
          setShowErrorModal(true);
          submitInProgressRef.current = false;
        } finally {
          setSubmitting(false);
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
              <Grid
                item
                xs={6}
              >
                <MyRadioField
                  label="Event"
                  name="usageType"
                  value="event"
                  className={styles.radio}
                />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <MyRadioField
                  label="Construction"
                  name="usageType"
                  value="construction"
                  className={styles.radio}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <MyMultipleSelectCheckmarks
                  label="Portable Units"
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
          </AnimationWrapper>
        </Form>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Thank You!"
        message="Quick quote request sent!"
        submessage="One of our representatives will contact you within 24 hours."
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Submission Failed"
        message="Failed to submit your quote request. Please try again."
        submessage="If the problem persists, please contact our support team."
      />
    </Formik>
  );
};

export default HeroQuickQuote;
