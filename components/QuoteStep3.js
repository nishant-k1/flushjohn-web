import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import QuoteStep3Styles from "../styles/QuoteStep3.module.css";
import { useContext, useState } from "react";
import { QuoteContext } from "../contexts/QuoteContext";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import { Event } from "../lib/analytics";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requirementDetails } from "../contexts/QuoteContext";
import { delivryDetails } from "../contexts/QuoteContext";
import { personalDetails } from "../contexts/QuoteContext";

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
      <div className={QuoteStep3Styles.outerBox}>
        <label
          className={QuoteStep3Styles.label}
          htmlFor={props.id || props.name}
        >
          {label}
          {props.name !== "cName" && (
            <span style={{ color: "red", fontSize: "x-large" }}>*</span>
          )}
        </label>
        <div className={QuoteStep3Styles.innerBox}>
          <input className={QuoteStep3Styles.input} {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className={QuoteStep3Styles.error}>
              {meta.error + " "}
              <span>
                <img style={{ height: "2rem" }} src="/assets/cry_emoji.gif" />
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
      <div className={QuoteStep3Styles.outerBox}>
        <label
          className={QuoteStep3Styles.label}
          htmlFor={props.id || props.name}
        >
          {label}
          {<span style={{ color: "red", fontSize: "x-large" }}>*</span>}
        </label>
        <div className={QuoteStep3Styles.innerBox}>
          <MaskedInput
            className={QuoteStep3Styles.input}
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            <div className={QuoteStep3Styles.error}>
              {meta.error + " "}
              <span>
                <img style={{ height: "2rem" }} src="/assets/cry_emoji.gif" />
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
            notify();
            await axios.post(`/api/quote`, values);
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
            Event("Request quote", "Quote Form Submit", "QFS");
          } catch (err) {}
        }}
      >
        <div className={QuoteStep3Styles.section}>
          <div className={QuoteStep3Styles.container}>
            <Form>
              <div className={QuoteStep3Styles.form}>
                <div className={QuoteStep3Styles.fName}>
                  <MyTextField
                    label="First Name"
                    name="fName"
                    type="text"
                    maxLength="50"
                    autoComplete="given-name"
                  />
                </div>

                <div className={QuoteStep3Styles.lName}>
                  <MyTextField
                    label="Last Name"
                    name="lName"
                    type="text"
                    maxLength="50"
                    autoComplete="family-name"
                  />
                </div>

                <div className={QuoteStep3Styles.cName}>
                  <MyTextField
                    label="Company Name (If any)"
                    name="cName"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                  />
                </div>

                <div className={QuoteStep3Styles.email}>
                  <MyTextField
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>

                <div className={QuoteStep3Styles.phone}>
                  <MyMaskedTextInput
                    label="Onsite Phone"
                    name="onsitePhone"
                    mask="(999) 999-9999"
                    autoComplete="off"
                    type="tel"
                  />
                </div>
              </div>
              <div
                className={`${QuoteStep3Styles.outerBox} ${QuoteStep3Styles.buttons}`}
              >
                <button type="submit" className={QuoteStep3Styles.next}>
                  SUBMIT
                </button>
                <button
                  className={QuoteStep3Styles.previous}
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
