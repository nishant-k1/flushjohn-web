import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import contactStyles from "../styles/Contact.module.css";
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
      <label className={contactStyles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={contactStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className={contactStyles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <MaskedInput className={contactStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMultilineTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className={contactStyles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={contactStyles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={contactStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const contact = () => {
  const [state, setState] = useState(false);
  return (
    <React.Fragment>
      <div className={contactStyles.section}>
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
          <div className={contactStyles.container}>
            <Form className={contactStyles.form}>
              <div className={contactStyles.firstName}>
                <MyTextField
                  label="First Name"
                  name="firstName"
                  type="text"
                  maxLength="15"
                  autoComplete="given-name"
                  placeholder="Jane"
                />
              </div>

              <div className={contactStyles.lastName}>
                <MyTextField
                  label="Last Name"
                  name="lastName"
                  type="text"
                  maxLength="20"
                  autoComplete="family-name"
                  placeholder="Doe"
                />
              </div>

              <div className={contactStyles.email}>
                <MyTextField
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@email.com"
                />
              </div>

              <div className={contactStyles.phone}>
                <MyMaskedTextInput
                  label="Phone"
                  name="phone"
                  mask="(999) 999-9999"
                  autoComplete="tel-national"
                  placeholder="(000) 000-0000"
                />
              </div>

              <div className={contactStyles.message}>
                <MyMultilineTextField
                  label="Message"
                  name="message"
                  type="textarea"
                  placeholder="Message"
                />
              </div>
              <button className={contactStyles.button} type="submit">
                SUBMIT
              </button>
            </Form>
            {state && <h1 style={{color:'white'}}>Your message has been delivered</h1>}
          </div>
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default contact;
