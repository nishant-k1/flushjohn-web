import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import MaskedInput from "react-input-mask";
import styles from "./styles.module.css";
import { useContext } from "react";
import { QuoteContext } from "../../../contexts/QuoteContext";
import { DatePicker } from "antd";
import moment from "moment";
import { Tooltip } from "antd";

const MyDateField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  return (
    <div className={styles.outerBox}>
      <label htmlFor={props.id || props.name}>
        {label}
        {<span style={{ color: "red", fontSize: "x-large" }}>*</span>}
      </label>
      <div className={styles.innerBox}>
        <DatePicker
          className={styles.date}
          {...props}
          label={props.label}
          // defaultValue={moment(new Date(), "MM/DD/YYYY")}
          format={"MM/DD/YYYY"}
          placeholder={props.label}
          disabledDate={(d) => !d || d.isBefore(new Date())}
          onChange={(e) => {
            setValue(moment(e).format("MMM Do YY"));
          }}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>
            {meta.error + " "}
            <span>
              <img
                style={{ height: "2rem" }}
                src="/assets/cry_emoji.gif"
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MyMultilineTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className={styles.innerBox}>
        <textarea
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>
            {meta.error + " "}
            <span>
              <img
                style={{ height: "2rem" }}
                src="/assets/cry_emoji.gif"
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label>
        {label}
        {(() => {
          if (props.name === "zip" || props.name === "street")
            return <span style={{ color: "red", fontSize: "x-large" }}>*</span>;
        })()}
      </label>
      <div className={styles.innerBox}>
        <input
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>
            {meta.error + " "}
            <span>
              <img
                style={{ height: "2rem" }}
                src="/assets/cry_emoji.gif"
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.outerBox}>
      <label>
        {label}
        {(() => {
          if (props.name === "zip" || props.name === "street")
            return <span style={{ color: "red", fontSize: "x-large" }}>*</span>;
        })()}
      </label>
      <div className={styles.innerBox}>
        {props.name == "zip" && (
          <Tooltip
            placement="right"
            title="Enter Number"
          >
            <MaskedInput
              {...field}
              {...props}
            />
          </Tooltip>
        )}
        {props.name !== "zip" && (
          <MaskedInput
            {...field}
            {...props}
          />
        )}
        {meta.touched && meta.error ? (
          <div className={styles.error}>
            {meta.error + " "}
            <span>
              <img
                style={{ height: "2rem" }}
                src="/assets/cry_emoji.gif"
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const QuoteStep2 = () => {
  const { render, data } = useContext(QuoteContext);
  const [step, setStep] = render;
  const [formValues, setFormValues] = data;
  return (
    <Formik
      initialValues={formValues}
      validationSchema={Yup.object({
        deliveryDate: Yup.string().required("This field can't be empty..."),
        pickupDate: Yup.string().required("This field can't be empty..."),
        street: Yup.string().required("This field can't be empty..."),
        zip: Yup.string().required("This field can't be empty..."),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setFormValues((prevValues) => {
            return { ...prevValues, ...values };
          });
          setStep(3);
        } catch (err) {}
      }}
    >
      <Form>
        <div className={styles.form}>
          <div className={styles.deliveryDate}>
            <MyDateField
              label="Delivery Date"
              name="deliveryDate"
            />
          </div>
          <div className={styles.pickupDate}>
            <MyDateField
              label="Pickup Date"
              name="pickupDate"
            />
          </div>
          <div className={styles.street}>
            <MyTextInput
              label="Street"
              name="street"
            />
          </div>
          <div className={styles.zip}>
            <MyMaskedTextInput
              label="Zip Code"
              name="zip"
              mask="99999"
              maskChar=""
            />
          </div>
          <div className={styles.city}>
            <MyMaskedTextInput
              label="City"
              name="city"
            />
          </div>
          <div className={styles.state}>
            <MyMaskedTextInput
              label="State"
              name="state"
            />
          </div>
          <div className={styles.phone}>
            <MyMaskedTextInput
              label="Phone"
              name="phone"
              mask="(999) 999-9999"
              autoComplete="off"
              type="tel"
            />
          </div>

          <div className={styles.hint}>
            <MyMultilineTextField
              label="Placement Instructions"
              name="hint"
            />
          </div>
        </div>
        <div className={`${styles.outerBox} ${styles.buttons}`}>
          <button
            type="submit"
            className={styles.next}
          >
            NEXT
          </button>
          <button
            onClick={() => {
              setStep(1);
            }}
            className={styles.previous}
          >
            PREVIOUS
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default QuoteStep2;