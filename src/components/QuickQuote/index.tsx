"use client";

import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import MyPhoneTextField from "../FormControls/MyPhoneTextField";
import MyMultilineTextField from "../FormControls/MyMultilineTextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import QuickQuoteButton from "./QuickQuoteButton";
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext";
import { ClientWidthContext } from "../../contexts/ClientWidthContext";
import CloseIcon from "@mui/icons-material/Close";
// import { apiBaseUrls } from "../../constants";
import MyRadioField from "../FormControls/MyRadioField";
import { logEvent } from "../../../react-ga4-config";
import { ClientWidthContextType } from "../../contexts/ClientWidthContext";
import { QuickQuoteContextType } from "../../contexts/QuickQuoteContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { io, Socket } from "socket.io-client";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "../FormControls/MyZipTextField";

// Define validation schema
const quickQuoteValidationSchema = Yup.object().shape({
  products: Yup.array().of(Yup.string().required("Required")),
  deliveryDate: Yup.string().required("Required"),
  pickupDate: Yup.string().required("Required"),
  zip: Yup.number().required("Required"),
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string().required("Required"),
  instructions: Yup.string(),
});

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

  // Handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    // if (quickQuoteRef.current) {
    //   const target = event.target as Node; // Type assertion
    //   if (!quickQuoteRef.current.contains(target)) {
    //     setQuickQuoteViewStatus(false);
    //   }
    // }
  };

  React.useEffect(() => {
    if (clientWidth && clientWidth > 600) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clientWidth]);

  const notify = () =>
    toast.success("Quick quote request sent!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
      console.warn("Google Ads tracking is not available");
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
          // validationSchema={quickQuoteValidationSchema}
          // validateOnChange={false}
          // validateOnBlur={true}

          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setQuickQuoteViewStatus(false);
            try {
              createLead({ ...values, leadSource: "Web Quick Lead" });
              notify();
              setQuickQuoteRequested(true);
              handleLeadConversion();
              // window.gtag("event", "conversion", {
              //   event_category: "Button",
              //   event_label: "Web Quick Quote",
              //   value: 1,
              // });
            } catch (err) {
              console.log(err);
            }
            // Reset the form with all required initial values
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
                        sx={{
                          background: "var(--primary-bg-color)",
                          borderRadius: 0,
                          "&:hover": {
                            background: "#ac6324",
                          },
                        }}
                        endIcon={<SendIcon />}
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
    </div>
  );
};

export default QuickQuote;
