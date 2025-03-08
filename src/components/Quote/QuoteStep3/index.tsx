"use client";

import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "@/contexts/QuoteContext";
import axios from "axios";
import { io, Socket } from "socket.io-client";
// import { Event } from "../lib/analytics";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialQuoteValues } from "@/contexts/QuoteContext";
import { apiBaseUrls } from "@/constants";
// import { logEvent } from "../../../../react-ga4-config";

const MyTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
        {props.name !== "cName" && (
          <span style={{ color: "red", fontSize: "x-large" }}>*</span>
        )}
      </label>
      <div className={styles.innerBox}>
        <input
          className={styles.input}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error + " "}</div>
        ) : null}
      </div>
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label className={styles.label}>
        {label}
        {props.name !== "contactPersonPhone" &&
          props.name !== "contactPersonName" && (
            <span style={{ color: "red", fontSize: "x-large" }}>*</span>
          )}
      </label>
      <div className={styles.innerBox}>
        <NumericFormat
          className={styles.input}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error + " "}</div>
        ) : null}
      </div>
    </div>
  );
};

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
  const { render, data } = useContext(QuoteContext);
  const [step, setStep] = render;
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
            // const res = await axios({
            //   method: "post",
            //   url: `${apiBaseUrls.API_BASE_URL}/leads`,
            //   data: { ...values, leadSource: "Web Lead" },
            // });
            // // logEvent({
            //   category: "Form",
            //   action: "Web Lead Form Submit",
            //   label: "Web Lead Form Submit Button",
            //   value: undefined,
            //   nonInteraction: undefined,
            //   transport: "beacon",
            // });
            // if (res.status === 201 && res.data.success) {
            //   notify();
            //   resetForm();
            //   setFormValues(initialQuoteValues);
            // }
            createLead({ ...values, leadSource: "Web Lead" });
            notify();
            resetForm();
            setFormValues(initialQuoteValues);
            setStep(1);
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
                  <MyTextField
                    label="First Name"
                    name="fName"
                    type="text"
                    maxLength="50"
                    autoComplete="given-name"
                  />
                </div>

                <div className={styles.lName}>
                  <MyTextField
                    label="Last Name"
                    name="lName"
                    type="text"
                    maxLength="50"
                    autoComplete="family-name"
                  />
                </div>

                <div className={styles.cName}>
                  <MyTextField
                    label="Company Name (If any)"
                    name="cName"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.email}>
                  <MyTextField
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>

                <div className={styles.phone}>
                  <MyMaskedTextInput
                    label="Phone"
                    name="phone"
                    mask="(999) 999-9999"
                    autoComplete="off"
                    type="tel"
                  />
                </div>

                <div className={styles.contactPersonName}>
                  <MyMaskedTextInput
                    label="Onsite Contact Person Name"
                    name="contactPersonName"
                  />
                </div>
                <div className={styles.phone}>
                  <MyMaskedTextInput
                    label="Onsite Contact Person Phone"
                    name="contactPersonPhone"
                    mask="(999) 999-9999"
                    autoComplete="off"
                    type="tel"
                  />
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
