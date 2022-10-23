import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import contactStyles from "../styles/Contact.module.css";

import axios from "axios";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import Head from "next/head";
import { Event } from "../lib/analytics";

const SEO = {
  title: "Reliable Portable - Contact | Portable Restroom Rental",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  const [spinner, setSpinner] = useState(false);
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="-7RA9p2zau4hrs82YsLlEwn89woYgVoNsZ6Nxj92qHw"
        />
      </Head>
      <NextSeo {...SEO} />
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
            setSpinner(true);
            await sleep(500);
            try {
              const res = await axios.post(`/api/contact`, values);
              res.status === 200 ? setState(true) : setState(false);
              Event("Contact", "Contact Form Submit", "CFS");
            } catch (err) {
              alert(
                `The server has some issues, please make a phone call instead submitting the form :( `
              );
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
              <button
                className={`${contactStyles.button} ${
                  state ? contactStyles.submitted : contactStyles.notSubmitted
                }`}
                type="submit"
              >
                {state ? (
                  <div className={contactStyles.acknowledge}>
                    <h2>Message sent successfully</h2>
                    <img src="/assets/tick.svg" alt="tick_img" />
                  </div>
                ) : spinner ? (
                  <div className={contactStyles.processing}>
                    <RiRefreshLine className={contactStyles.spinner} />
                    <h3>SUBMIT</h3>
                  </div>
                ) : (
                  `SUBMIT`
                )}
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </>
  );
};

export default contact;
