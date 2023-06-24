import { Formik, Form } from "formik";
import styles from "./styles.module.css";
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
import { QuickQuoteContext } from "../../contexts/QuickQuoteContext";
import { ClientWidthContext } from "../../contexts/ClientWidthContext";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { apiBaseUrls } from "../../constants";

const quickQuoteValidationSchema = Yup.object().shape({
  products: Yup.array().of(
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
        // setQuickQuoteViewStatus(false);
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
        animate={quickQuoteViewStatus ? { opacity: 1 } : { opacity: 0 }}
      >
        {quickQuoteViewStatus && (
          <Formik
            initialValues={{
              products: [],
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
              setQuickQuoteViewStatus(false);
              // res.status === 200 && notify();

              // Event("Request quote", "Prompt Form Submit", "PFS");

              try {
                await axios({
                  method: "post",
                  url: "/leads",
                  baseURL: apiBaseUrls.CRM_RP_SOCKET_SERVICES_BASE_URL,
                  data: { ...values, leadSource: "Web-Quick Quote" },
                });

                await axios({
                  method: "post",
                  url: "/quick-quote",
                  data: { ...values, leadSource: "Web-Quick Quote" },
                });
              } catch (err) {
                console.log(err);
              }

              notify();

              resetForm({
                products: [],
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
            <div
              className={styles.overlay}
              style={{
                display: quickQuoteViewStatus ? "block" : "none",
              }}
            >
              <Form className={styles.form}>
                {quickQuoteViewStatus && clientWidth <= 768 && (
                  <CloseIcon
                    className={styles.closeIcon}
                    onClick={() => {
                      setQuickQuoteViewStatus(false);
                    }}
                  />
                )}
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <h2>Quick Free Quote</h2>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyMultipleSelectCheckmarks
                      // className={styles.multiSelect}
                      label="Portable Units"
                      name="products"
                      // isMulti
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <MyDateField
                      label="Delivery Date"
                      className={styles.date}
                      name="deliveryDate"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <MyDateField
                      className={styles.date}
                      label="Pickup Date"
                      name="pickupDate"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyMaskedTextField
                      label="Zip"
                      name="zip"
                      mask="99999"
                      maskChar=""
                      placeholder="Zip"
                      type="tel"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyTextField
                      label="Full Name"
                      name="fullName"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyTextField
                      label="Email"
                      name="email"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyMaskedTextField
                      label="Phone"
                      name="phone"
                      mask="(999) 999-9999"
                      placeholder="Phone"
                      type="tel"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <MyMultilineTextField
                      label="Instructions (if any)"
                      name="instructions"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        background: "#DB517A",
                        borderRadius: 0,
                        "&:hover": {
                          background: "#DB517A",
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
            </div>
          </Formik>
        )}
      </motion.div>
      <QuickQuoteButton />
    </div>
  );
};

export default QuickQuote;
