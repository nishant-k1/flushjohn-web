"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/contexts/QuoteContext";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialQuoteValues } from "@/contexts/QuoteContext";
import { apiBaseUrls } from "@/constants";
import TextField from "../FormFields/TextField";
import PhoneField from "../FormFields/PhoneField";

const QuoteStep3 = () => {
  const notify = () =>
    toast.success("Quote request sent !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        // validationSchema={Yup.object({
        //   fName: Yup.string().required("Required"),
        //   lName: Yup.string().required("Required"),
        //   cName: Yup.string(),
        //   email: Yup.string()
        //     .email("Invalid email address")
        //     .required("Required"),
        //   phone: Yup.string().required("Required"),
        // })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            createLead({ ...values, leadSource: "Web Lead" });
            notify();
            setQuoteRequested(true);
            resetForm();
            setFormValues(initialQuoteValues);
            setStep(1);
            window.scrollTo(0, 0);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <div className={styles.section}>
          <div className={styles.container}>
            <Form>
              <div className={styles.form}>
                <div className={styles.fName}>
                  <TextField
                    label="First Name"
                    name="fName"
                    type="text"
                    maxLength="50"
                    autoComplete="given-name"
                  />
                </div>

                <div className={styles.lName}>
                  <TextField
                    label="Last Name"
                    name="lName"
                    type="text"
                    maxLength="50"
                    autoComplete="family-name"
                  />
                </div>

                <div className={styles.cName}>
                  <TextField
                    label="Company Name (If any)"
                    name="cName"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.email}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>

                <div className={styles.phone}>
                  <div>
                    <PhoneField
                      label="Phone"
                      name="phone"
                    />
                  </div>
                </div>
                <div className={styles.contactPersonName}>
                  <TextField
                    label="Onsite Contact Person Name"
                    name="contactPersonName"
                  />
                </div>
                <div className={styles.phone}>
                  <div>
                    <PhoneField
                      label="Onsite Contact Person Phone"
                      name="contactPersonPhone"
                      autoComplete="off"
                    />
                  </div>
                </div>
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
    </div>
  );
};

export default QuoteStep3;
