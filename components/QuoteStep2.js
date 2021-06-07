import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import QuoteStep2Styles from '../styles/QuoteStep2.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyDateInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers
  return (
    <div className={QuoteStep2Styles.outerBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <DatePicker className={`${QuoteStep2Styles.input} ${QuoteStep2Styles.date}`} {...field} {...props} minDate={new Date()} selected={field.value} onChange={value => setValue(value)}/>
      {meta.touched && meta.error ? (
        <div className={QuoteStep2Styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={QuoteStep2Styles.outerBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={QuoteStep2Styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={QuoteStep2Styles.outerBox}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <MaskedInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={QuoteStep2Styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const QuoteStep3 = () => {  
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data
  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          deliveryDate: Yup.date()
            .required('Required'),
          pickupDate: Yup.date()
            .required('Required'),
          zip: Yup.string()
            .required('Required'),
          hint: Yup.string(),
        })}

        onSubmit={ async (values, { setSubmitting, resetForm }) => {
          await sleep(500);
          try{
            setFormValues((prevValues) => {
              return {...prevValues, ...values}
            })
            setStep(3)
          } catch(err){
            alert(err)
          }
        }}
      >
          <Form className={QuoteStep2Styles.form}>
            <div className={QuoteStep2Styles.deliveryDate}>
              <MyDateInput
                label="Delivery Date"
                id="deliveryDate"
                name="deliveryDate"
                dateFormat="MMMM d, yyyy"
                autoComplete='off'
              />
            </div>

            <div className={QuoteStep2Styles.pickupDate}>
              <MyDateInput
                label="Pickup Date"
                name="pickupDate"
                dateFormat="MMMM d, yyyy"
                autoComplete='off'
              />
            </div>

            <div className={QuoteStep2Styles.zip}>
              <MyMaskedTextInput
                  label="Zip Code"
                  name="zip"
                  mask="99999"
                  maskChar=""
                  autoComplete="postal-code"
                  type='tel'
                />
            </div>
            <div className={QuoteStep2Styles.hint}>
              <MyTextArea
                  label="Placement Instructions"
                  name="hint"
                  type="textarea"
                />
            </div>
            <div className={`${QuoteStep2Styles.outerBox} ${QuoteStep2Styles.buttons}`}>
              <button onClick={() =>{setStep(1)}}>BACK</button>
              <button type="submit">CONTINUE</button>
            </div>
          </Form>
        </Formik>
      </div>
  )
}

export default QuoteStep3
