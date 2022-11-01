import { Formik, Form } from "formik";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import axios from "axios";
import React from "react";
import { Event } from "../lib/analytics";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import MyMaskedTextField from "../FormControls/MyMaskedTextField";

import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const QuickQuote = () => {
  const notify = () =>
    toast.success("Quick quote request sent !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <>
      <Formik
        initialValues={{
          portableUnits: [],
          deliveryDate: "",
          pickupDate: "",
          zip: "",
          instructions: "",
          fullName: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          portableUnits: Yup.array("This field can't be empty...").required(
            "This field can't be empty..."
          ),
          deliveryDate: Yup.string().required("This field can't be empty..."),
          pickupDate: Yup.string().required("This field can't be empty..."),
          zip: Yup.number().required("This field can't be empty..."),
          instructions: Yup.string().max(120, "Must be 120 characters or less"),
          fullName: Yup.string().required("This field can't be empty..."),
          email: Yup.string()
            .email("Invalid email address")
            .required("This field can't be empty..."),
          phone: Yup.string().required("This field can't be empty..."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          Event("Request quote", "Prompt Form Submit", "PFS");
          try {
            notify();
            resetForm();
            await axios.post(`/api/quickQuote`, values);
          } catch (err) {}
        }}
      >
        <Form className={quickQuoteStyles.form}>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <h2 style={{ paddng: 0, margin: 0, color: "white" }}>
                Quick Free Quote
              </h2>
            </Grid>
            <Grid item xs={12}>
              <MyMultipleSelectCheckmarks
                label="Select Portable Units"
                name="portableUnits"
                placeholder="Select Portable Units"
                isMulti
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyDateField
                label="Delivery Date"
                className={quickQuoteStyles.date}
                name="deliveryDate"
                placeholder="Delivery Date"
                autoComplete="off"
                style={{
                  color: "black",
                  fontWeight: 100,
                  fontSize: "medium",
                  fontFamily: "Times New Roman",
                  width: "100%",
                  height: "2.5rem",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyDateField
                className={quickQuoteStyles.date}
                label="Pickup Date"
                name="pickupDate"
                placeholder="Pickup Date"
                autoComplete="off"
                style={{
                  color: "black",
                  fontWeight: 100,
                  fontSize: "medium",
                  fontFamily: "Times New Roman",
                  width: "100%",
                  height: "2.5rem",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                label="Zip"
                type="number"
                maxlength={5}
                name="zip"
                mask="99999"
                maskChar=""
                autoComplete="postal-code"
                placeholder="Zip Code"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                label="Instructions"
                name="instructions"
                placeholder="Instructions"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                label="Full Name"
                name="fullName"
                maxLength="60"
                autoComplete="given-name"
                placeholder="Full Name"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <MyMaskedTextField
                label="Phone"
                name="phone"
                mask="(999) 999-9999"
                autoComplete="off"
                placeholder="Phone"
                type="tel"
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" endIcon={<SendIcon />} type="submit">
                Send
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default QuickQuote;
