import { Formik, Form } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import { MdDone } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { Event } from "../lib/analytics";
import MyMaskedTextInput from "../FormControls/MyMaskedTextField";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import MyMultilineTextField from "../FormControls/MyMultilineTextField";

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
        // validationSchema={Yup.object({
        //   fullName: Yup.mixed()
        //     .max(60, "Must be 60 characters or less")
        //     .required("Required"),
        //   email: Yup.mixed()
        //     .email("Invalid email address")
        //     .required("Required"),
        //   phone: Yup.mixed().required("Required"),
        //   zip: Yup.mixed("Invalid email Zip").required("Required"),
        //   products: Yup.mixed().required("Required"),
        //   deliveryDate: Yup.date().required("Required"),
        //   pickupDate: Yup.date().required("Required"),
        //   instructions: Yup.string(),
        // })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          Event("Request quote", "Prompt Form Submit", "PFS");
          setSpinner(true);
          try {
            const res = await axios.post(`/api/quickQuote`, values);
            res.status === 200 ? setState(true) : setState(false);
            state && resetForm();
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
            <MyMultipleSelectCheckmarks
              name="products"
              id="products"
              placeholder="Select Products"
              isMulti
            />
          </div>
          <div className={quickQuoteStyles.dates}>
            <div className={quickQuoteStyles.deliveryDate}>
              <MyDateField
                id="deliveryDate"
                name="deliveryDate"
                dateFormat="MMMM d, yyyy"
                placeholderText="Delivery Date"
                autoComplete="off"
              />
            </div>
            <div className={quickQuoteStyles.pickupDate}>
              <MyDateField
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
              type="string"
            />
          </div>
          <div className={quickQuoteStyles.instructions}>
            <MyMultilineTextField
              name="instructions"
              type="textarea"
              placeholder="Instructions"
            />
          </div>
          <div className={quickQuoteStyles.firstName}>
            <MyTextField
              name="fullName"
              type="string"
              maxLength="60"
              autoComplete="given-name"
              placeholder="Full Name"
            />
          </div>
          <div className={quickQuoteStyles.email}>
            <MyTextField
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
          {!state && (
            <button
              className={`${quickQuoteStyles.button} ${quickQuoteStyles.submitting}`}
              type="submit"
            >
              {!state && `SEND`}
            </button>
          )}
          {state && (
            <div
              onClick={() => {}}
              className={`${quickQuoteStyles.button} ${quickQuoteStyles.submitting}`}
              style={{ backgroundColor: "rgba(42, 43, 44, 0.815)" }}
            >
              {state && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  REQUEST SENT <MdDone style={{ fontSize: "2rem" }} />
                </div>
              )}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default QuickQuote;
