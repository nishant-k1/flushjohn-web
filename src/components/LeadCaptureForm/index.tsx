"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "@/features/quote/components/QuickQuote/styles.module.css";
import { api } from "@/utils/apiClient";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";
import MyTextField from "@/components/FormControls/MyTextField";
import MyPhoneTextField from "@/components/FormControls/MyPhoneTextField";
import MyZipTextField from "@/components/FormControls/MyZipTextField";
import MyMultilineTextField from "@/components/FormControls/MyMultilineTextField";
import Grid from "@/components/UI/Grid";
import Button from "@/components/UI/Button";
import { SendIcon, CloseIcon } from "@/components/UI/Icons";

interface LeadCaptureFormProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string; // Track where form was triggered from
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  zip: Yup.string().optional(),
  requirement: Yup.string().optional(),
});

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  isOpen,
  onClose,
  triggerSource = "scroll_popup",
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const finalData = {
        fName: values.name,
        email: values.email,
        phone: values.phone,
        zip: values.zip || "",
        instructions: values.requirement || "",
        leadSource: `Web Lead Capture - ${triggerSource}`,
        usageType: "Other",
        deliveryDate: "",
        pickupDate: "",
        streetAddress: "",
        city: "",
        state: "",
        lName: "",
        cName: "",
        contactPersonName: "",
        contactPersonPhone: "",
        products: [],
      };

      await api.post(`${API_BASE_URL}/leads`, finalData);

      // Track conversion
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_G_TAG_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LEAD_CAPTURE_SUFFIX || "lead_capture"}`,
        });
      }

      setShowSuccessModal(true);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting lead:", error);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            zip: "",
            requirement: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikSubmitting }) => (
            <Form>
              <div
                className={styles.quickQuoteform}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseIcon
                  size={24}
                  className={styles.closeIcon}
                  onClick={onClose}
                />
                <div>
                  <Grid container spacing={0.5}>
                    <Grid item xs={12}>
                      <div>
                        <h2>Get instant quote and booking</h2>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField
                        label="Name"
                        name="name"
                        placeholder="Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField
                        label="Email"
                        name="email"
                        placeholder="Email"
                      />
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
                      <MyZipTextField
                        label="Zip Code"
                        name="zip"
                        placeholder="Zip Code (Optional)"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MyMultilineTextField
                        label="Requirement"
                        name="requirement"
                        placeholder="Need quote for porta potty (Optional)"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        style={{
                          background: "var(--primary-bg-color)",
                          color: "var(--text-inverse)",
                          width: "100%",
                          padding: "0.75rem",
                          fontSize: "14px",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: 0,
                        }}
                        type="submit"
                        disabled={formikSubmitting || isSubmitting}
                      >
                        {formikSubmitting || isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <SendIcon size={18} style={{ marginRight: "8px" }} />
                            Request Callback
                          </>
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Thank You!"
          message="We've received your request. Our team will call you back shortly!"
        />
      )}

      {showErrorModal && (
        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Oops!"
          message="Something went wrong. Please try again or call us directly."
        />
      )}
    </>
  );
};

export default LeadCaptureForm;
