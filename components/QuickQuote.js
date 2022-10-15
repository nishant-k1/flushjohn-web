import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import quickQuoteStyles from "../styles/QuickQuote.module.css";

import axios from "axios";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { Event } from "../lib/analytics";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <MaskedInput className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const options = [
  { value: "SPR", label: "Standard Portable Restroom" },
  { value: "DFR", label: "Deluxe Flushable Restroom" },
  { value: "ACR", label: "ADA Portable Restroom" },
  { value: "HWS", label: "Hand Wash Sink Station" },
];
const customStyles = {
  control: (base) => ({
    ...base,
    border: "solid 1px rgba(0, 0, 0, 0.5)",
    borderRadius: "none",
    background: `#F7F7F7`,
    boxShadow: "none",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "black",
      fontSize: `medium`,
      fontWeight: `300`,
    };
  },
};

const MySelect = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <Select
        styles={customStyles}
        {...field}
        {...props}
        onChange={(value) => setValue(value)}
      />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyDateInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <DatePicker
        className={`${quickQuoteStyles.input} ${quickQuoteStyles.date}`}
        {...field}
        {...props}
        minDate={new Date()}
        selected={field.value}
        onChange={(value) => setValue(value)}
      />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className={quickQuoteStyles.label}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea className={quickQuoteStyles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const QuickQuote = () => {
  const [state, setState] = useState(false);
  const [spinner, setSpinner] = useState(false);
  return (
    <div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phone: "",
          products: "",
          zip: "",
          deliveryDate: "",
          pickupDate: "",
          instructions: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .max(60, "Must be 60 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string().required("Required"),
          zip: Yup.string().required("Required"),
          products: Yup.mixed().required("Required"),
          deliveryDate: Yup.date().required("Required"),
          pickupDate: Yup.date().required("Required"),
          instructions: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          Event("Request quote", "Prompt Form Submit", "PFS");
          setSpinner(true);
          await sleep(500);
          try {
            const res = await axios.post(`/api/quickQuote`, values);
            res.status === 200 ? setState(true) : setState(false);
          } catch (err) {
            alert(
              `The server has some issues, please try again or just make a phone call :( `
            );
          }
          resetForm();
        }}
      >
        <Form className={quickQuoteStyles.form}>
          <h2>Prompt Quote</h2>
          <div className={quickQuoteStyles.products}>
            <MySelect
              name="products"
              id="products"
              placeholder="Select Products"
              isMulti
              options={options}
            />
          </div>
          <div className={quickQuoteStyles.dates}>
            <div className={quickQuoteStyles.deliveryDate}>
              <MyDateInput
                id="deliveryDate"
                name="deliveryDate"
                dateFormat="MMMM d, yyyy"
                placeholderText="Delivery Date"
                autoComplete="off"
              />
            </div>
            <div className={quickQuoteStyles.pickupDate}>
              <MyDateInput
                name="pickupDate"
                dateFormat="MMMM d, yyyy"
                placeholderText="Pickup Date"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={quickQuoteStyles.zip}>
            <MyMaskedTextInput
              name="zip"
              mask="99999"
              maskChar=""
              autoComplete="postal-code"
              placeholder="Zip Code"
              type="tel"
            />
          </div>
          <div className={quickQuoteStyles.instructions}>
            <MyTextArea
              name="instructions"
              type="textarea"
              placeholder="Instructions"
            />
          </div>
          <div className={quickQuoteStyles.firstName}>
            <MyTextInput
              name="fullName"
              type="text"
              maxLength="60"
              autoComplete="given-name"
              placeholder="Full Name"
            />
          </div>
          <div className={quickQuoteStyles.email}>
            <MyTextInput
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
            />
          </div>
          <div className={quickQuoteStyles.phone}>
            <MyMaskedTextInput
              name="phone"
              mask="(999) 999-9999"
              autoComplete="off"
              placeholder="Phone"
              type="tel"
            />
          </div>
          <button
            className={`${quickQuoteStyles.button} ${
              state ? quickQuoteStyles.submitted : quickQuoteStyles.notSubmitted
            }`}
            type="submit"
          >
            {state ? (
              <div className={quickQuoteStyles.acknowledge}>
                <p>Request sent</p>
                <img
                  className={quickQuoteStyles.tick}
                  src="/assets/tick.svg"
                  alt="https://reliableportable.com"
                />
              </div>
            ) : spinner ? (
              <div className={quickQuoteStyles.processing}>
                <RiRefreshLine className={quickQuoteStyles.spinner} />
                <p>SENDING REQUEST</p>
              </div>
            ) : (
              `SEND`
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default QuickQuote;
