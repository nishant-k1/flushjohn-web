"use client";

import { Formik, Form } from "formik";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import MyMultipleSelectCheckmarks from "@/components/FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "@/components/FormControls/MyTextField";
import DateInput from "@/components/FormControls/DateInput";
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
import { ClientWidthContextType } from "@/contexts/ClientWidthContext";
import AnimationWrapper from "@/anmations/AnimationWrapper";
import { animations } from "@/anmations/effectData";
import { apiBaseUrls } from "@/constants";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import { api } from "@/utils/apiClient";
import {
  QuickQuoteContext,
  QuickQuoteContextType,
} from "@/features/quote/contexts/QuickQuoteContext";

const quickQuoteValidationSchema = Yup.object().shape({
  products: Yup.array().of(Yup.string().required("Required")),
  deliveryDate: Yup.string().required("Required"),
  pickupDate: Yup.string().required("Required"),
  zip: Yup.string()
    .matches(/^\d{5}$/, "Zip code must be 5 digits")
    .required("Required"),
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

  const handleLeadConversion = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-11248564671/6KpkCNjzpaoaEL_z3fMp",
      });
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
        setSubmitting(true);
        try {
          // Data is automatically serialized by apiClient
          const finalData = {
            ...values,
            leadSource: "Web Hero Quick Lead",
          };

          await api.post(`${API_BASE_URL}/leads`, finalData);

          setShowSuccessModal(true);
          setQuickQuoteRequested(true);
          handleLeadConversion();
          resetForm();
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error submitting lead:", err);
          }
          setShowErrorModal(true);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {
        (({ isSubmitting }: any) => (
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
                    <DateInput
                      label="Delivery Date"
                      name="deliveryDate"
                      required
                      variant="quickquote"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                  >
                    <DateInput
                      label="Pickup Date"
                      name="pickupDate"
                      required
                      variant="quickquote"
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
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </AnimationWrapper>
            </Form>
          </div>
        )) as unknown as React.ReactNode
      }
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
