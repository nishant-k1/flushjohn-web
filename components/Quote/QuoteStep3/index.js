import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { QuoteContext } from "../../../contexts/QuoteContext";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
// import { Event } from "../lib/analytics";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requirementDetails } from "../../../contexts/QuoteContext";
import { delivryDetails } from "../../../contexts/QuoteContext";
import { personalDetails } from "../../../contexts/QuoteContext";

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

  const MyTextField = ({ label, ...props }) => {
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
            <div className={styles.error}>
              {meta.error + " "}
              <span>
                <img
                  style={{ height: "2rem" }}
                  src="/assets/cry_emoji.gif"
                />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className={styles.outerBox}>
        <label
          className={styles.label}
          htmlFor={props.id || props.name}
        >
          {label}
          {<span style={{ color: "red", fontSize: "x-large" }}>*</span>}
        </label>
        <div className={styles.innerBox}>
          <MaskedInput
            className={styles.input}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className={styles.error}>
              {meta.error + " "}
              <span>
                <img
                  style={{ height: "2rem" }}
                  src="/assets/cry_emoji.gif"
                />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          fName: Yup.string().required("This field can't be empty..."),
          lName: Yup.string().required("This field can't be empty..."),
          cName: Yup.string(),
          email: Yup.string()
            .email("Invalid email address")
            .required("This field can't be empty..."),
          phone: Yup.string().required("This field can't be empty..."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setFormValues((prevValues) => {
              return { ...prevValues, ...values };
            });
            await axios.post(`/api/quote`, values);
            setTimeout(() => {
              notify();
            }, 2000);
            setStep(1);
            setFormValues((prevValues) => {
              return {
                ...prevValues,
                ...delivryDetails,
                ...requirementDetails,
                ...personalDetails,
              };
            });
            resetForm();
            // Event("Request quote", "Quote Form Submit", "QFS");
          } catch (err) {}
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
                    label="Onsite Phone"
                    name="onsitePhone"
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
