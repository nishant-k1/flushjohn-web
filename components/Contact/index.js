import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import styles from "./styles.module.css";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Your message has been delivered", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <MaskedInput
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMultilineTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={styles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        className={styles.textarea}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Contact = () => {
  const [state, setState] = useState(false);
  return (
    <React.Fragment>
      <div className={styles.section}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string().required("Required"),
            message: Yup.string()
              .min(1, "Message cannot be empty")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const res = await axios.post(`/api/contact`, values);
              res.status === 200 ? setState(true) : setState(false);
              res.status === 200 && notify();
              // Event("Contact", "Contact Form Submit", "CFS");
            } catch (err) {
              console.log(err);
            }
            resetForm();
          }}
        >
          <div className={styles.container}>
            <Form className={styles.form}>
              <div className={styles.firstName}>
                <MyTextField
                  label="First Name"
                  name="firstName"
                  type="text"
                  maxLength="15"
                  autoComplete="given-name"
                  placeholder="Jane"
                />
              </div>

              <div className={styles.lastName}>
                <MyTextField
                  label="Last Name"
                  name="lastName"
                  type="text"
                  maxLength="20"
                  autoComplete="family-name"
                  placeholder="Doe"
                />
              </div>

              <div className={styles.email}>
                <MyTextField
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@email.com"
                />
              </div>

              <div className={styles.phone}>
                <MyMaskedTextInput
                  label="Phone"
                  name="phone"
                  mask="(999) 999-9999"
                  autoComplete="tel-national"
                  placeholder="(000) 000-0000"
                />
              </div>

              <div className={styles.message}>
                <MyMultilineTextField
                  label="Message"
                  name="message"
                  type="textarea"
                  placeholder="Message"
                />
              </div>
              <button
                className={styles.button}
                type="submit"
              >
                SUBMIT
              </button>
            </Form>
            {state && (
              <h1 style={{ color: "white" }}>
                Your message has been delivered
              </h1>
            )}
          </div>
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Contact;