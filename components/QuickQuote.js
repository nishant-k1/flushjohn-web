import { Formik, Form } from "formik";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import axios from "axios";
import React from "react";
import { Event } from "../lib/analytics";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      theme: "light",
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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          Event("Request quote", "Prompt Form Submit", "PFS");
          try {
            const res = await axios.post(`/api/quickQuote`, values);
            notify();
            resetForm();
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
                name="deliveryDate"
                placeholder="Delivery Date"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyDateField
                label="Pickup Date"
                name="pickupDate"
                placeholder="Pickup Date"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                label="Zip"
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
              <MyTextField
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
              <ToastContainer />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default QuickQuote;
