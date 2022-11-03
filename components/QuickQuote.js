import { Formik, Form } from "formik";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import axios from "axios";
import React from "react";
import { Event } from "../lib/analytics";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import MyMaskedTextField from "../FormControls/MyMaskedTextField";
import MyMultilineTextField from "../FormControls/MyMultilineTextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const quickQuoteValidationSchema = Yup.object().shape({
  portableUnits: Yup.array().of(
    Yup.string().required("This field can't be empty...")
  ),
  deliveryDate: Yup.string().required("This field can't be empty..."),
  pickupDate: Yup.string().required("This field can't be empty..."),
  zip: Yup.number().required("This field can't be empty..."),
  fullName: Yup.string().required("This field can't be empty..."),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field can't be empty..."),
  phone: Yup.string().required("This field can't be empty..."),
  instructions: Yup.string(),
});

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
        validationSchema={quickQuoteValidationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          Event("Request quote", "Prompt Form Submit", "PFS");
          try {
            await axios.post(`/api/quickQuote`, values);
            notify();
            resetForm({
              portableUnits: [{}],
              deliveryDate: "",
              pickupDate: "",
              zip: "",
              instructions: "",
              fullName: "",
              email: "",
              phone: "",
            });
          } catch (err) {}
        }}
      >
        <Form className={quickQuoteStyles.form}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h2>Quick Free Quote</h2>
            </Grid>
            <Grid item xs={12}>
              <MyMultipleSelectCheckmarks
                label="Portable Units"
                name="portableUnits"
                isMulti
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyDateField
                label="Delivery Date"
                className={quickQuoteStyles.date}
                name="deliveryDate"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MyDateField
                className={quickQuoteStyles.date}
                label="Pickup Date"
                name="pickupDate"
              />
            </Grid>
            <Grid item xs={12}>
              <MyMaskedTextField
                label="Zip"
                name="zip"
                mask="99999"
                maskChar=""
                placeholder="Zip"
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField label="Full Name" name="fullName" />
            </Grid>
            <Grid item xs={12}>
              <MyTextField label="Email" name="email" />
            </Grid>
            <Grid item xs={12}>
              <MyMaskedTextField
                label="Phone"
                name="phone"
                mask="(999) 999-9999"
                placeholder="Phone"
              />
            </Grid>
            <Grid item xs={12}>
              <MyMultilineTextField
                label="Instructions (if any)"
                name="instructions"
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
