import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import QuoteStep3Styles from "../styles/QuoteStep3.module.css";
import { useContext, useState } from "react";
import { QuoteContext } from "../contexts/QuoteContext";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import { Event } from "../lib/analytics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuoteStep3 = () => {
  const notify = () =>
    toast.success("Quick quote request sent !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const { render, data } = useContext(QuoteContext);
  const [state, setState] = useState(false);
  const [spinner, setSpinner] = useState(false);
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
          fName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("It can't be empty..."),
          lName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("It can't be empty..."),
          cName: Yup.string().max(120, "Must be 120 characters or less"),
          email: Yup.string()
            .email("Invalid email address")
            .required("It can't be empty..."),
          phone: Yup.string().required("It can't be empty..."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSpinner(true);
          try {
            await setFormValues((prevValues) => {
              return { ...prevValues, ...values };
            });
            await axios.post(`/api/quote`, values);
            notify();
            // setStep(4);
            resetForm();
            Event("Request quote", "Quote Form Submit", "QFS");
          } catch (err) {
            console.log(err);
          }
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
