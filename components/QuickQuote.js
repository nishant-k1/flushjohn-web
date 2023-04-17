import { Formik, Form } from "formik";
import quickQuoteStyles from "../styles/QuickQuote.module.css";
import axios from "axios";
import React from "react";
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
import QuickQuoteButton from "./QuickQuoteButton";
import { ClientWidthContext } from "../contexts/ClientWidthContext";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";
import ModalBackground from "./ModalBackground";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";

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
  const [clientWidth, setClientWidth] = React.useContext(ClientWidthContext);
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  const quickQuoteRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (quickQuoteRef.current) {
      if (!quickQuoteRef.current.contains(event.target)) {
        setQuickQuoteViewStatus(false);
      }
    }
  };

  React.useEffect(() => {
    if (typeof window && clientWidth > 600) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [quickQuoteRef]);

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
    <div ref={quickQuoteRef}>
      <motion.div 
        animate={ quickQuoteViewStatus ? { opacity: 1 } : {  opacity: 0 } } >
        {quickQuoteViewStatus && clientWidth <= 600 && <ModalBackground />}
        {quickQuoteViewStatus && (
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
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // Event("Request quote", "Prompt Form Submit", "PFS");
              try {
                const res = await axios.post(`/api/quickQuote`, values);
                // res.status === 200 && notify();
                setTimeout(() => { notify() }, 2000);
                console.log(res);
              } catch (err) {
                console.log(err);
              }
              resetForm({
                portableUnits: [],
                deliveryDate: "",
                pickupDate: "",
                zip: "",
                instructions: "",
                fullName: "",
                email: "",
                phone: "",
              });
            }}
          >
            <Form className={quickQuoteStyles.form}>
              { quickQuoteViewStatus && clientWidth <= 600 
                && <CloseIcon className={quickQuoteStyles.closeIcon} onClick={() => {
                  setQuickQuoteViewStatus(false);
                }} /> }
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <h2>Quick Free Quote</h2>
                </Grid>
                <Grid item xs={12}>
                  <MyMultipleSelectCheckmarks
                    // className={quickQuoteStyles.multiSelect}
                    label="Portable Units"
                    name="portableUnits"
                    // isMulti
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
                    type="tel"
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
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyMultilineTextField
                    label="Instructions (if any)"
                    name="instructions"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#162184",
                      borderRadius: 0,
                      "&:hover": {
                        background: "#101B80",
                      },
                    }}
                    endIcon={<SendIcon />}
                    type="submit"
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        )}
      </motion.div>
      <QuickQuoteButton />
    </div>
  );
};

export default QuickQuote;
