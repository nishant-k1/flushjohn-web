import { Formik, Form } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import { MdDone } from "react-icons/md";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Event } from "../lib/analytics";
import MyMaskedTextInput from "../FormControls/MyMaskedTextField";
import MyMultipleSelectCheckmarks from "../FormControls/MyMultipleSelectCheckmarks";
import MyTextField from "../FormControls/MyTextField";
import MyDateField from "../FormControls/MyDateField";
import MyLoadingButton from "../FormControls/MyLoadingButton";
import { Box, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ClientWidthContext } from "./../contexts/ClientWidthContext/index";

const QuickQuote = () => {
  const [state, setState] = useState(false);
  const { clientWidth } = React.useContext(ClientWidthContext);
  return (
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
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        Event("Request quote", "Prompt Form Submit", "PFS");
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
      <Box className={quickQuoteStyles.form}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <h2 style={{ paddng: 0, margin: 0, color: "white" }}>
              Quick Free Quote
            </h2>
          </Grid>
          <Grid item xs={12}>
            <MyMultipleSelectCheckmarks
              label="Select Products"
              name="products"
              id="products"
              placeholder="Select Products"
              isMulti
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyDateField
              label="Delivery Date"
              id="deliveryDate"
              name="deliveryDate"
              dateFormat="MMMM d, yyyy"
              placeholderText="Delivery Date"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MyDateField
              label="Pickup Date"
              name="pickupDate"
              dateFormat="MMMM d, yyyy"
              placeholderText="Pickup Date"
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
              className={quickQuoteStyles.phone}
              label="Phone"
              name="phone"
              mask="(999) 999-9999"
              autoComplete="off"
              placeholder="Phone"
              type="tel"
            />
          </Grid>
          <Grid item xs={3}>
            {!state && (
              <MyLoadingButton
                variant="contained"
                size="medium"
                type="submit"
                endIcon={<SendIcon />}
              >
                {!state && `SEND`}
              </MyLoadingButton>
            )}
            {state && (
              <Box
                onClick={() => {}}
                className={`${quickQuoteStyles.LoadingButton} ${quickQuoteStyles.submitting}`}
                style={{ backgroundColor: "rgba(42, 43, 44, 0.815)" }}
              >
                {state && (
                  <Box style={{ display: "flex", alignBoxs: "center" }}>
                    REQUEST SENT <MdDone style={{ fontSize: "2rem" }} />
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Formik>
  );
};

export default QuickQuote;
