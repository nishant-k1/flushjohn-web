import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import quickQuoteStyles from '../styles/QuickQuote.module.css'
import {server} from '../config/index'
import axios from 'axios';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className={quickQuoteStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <input className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const MyMaskedTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className={quickQuoteStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <MaskedInput className={quickQuoteStyles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const options = [
  { value: 'SPR', label: 'Standard Portable Restroom' },
  { value: 'DFR', label: 'Deluxe Flushable Restroom' },
  { value: 'ACR', label: 'ADA Portable Restroom' },
  { value: 'HWS', label: 'Hand Wash Sink Station' }
]
const customStyles = {
  control: base => ({
    ...base,
    border: 'solid 1px rgba(0, 0, 0, 0.37)',
    boxShadow: 'none'
  })
}
const MySelect = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers
  return (
    <div>
      <label className={quickQuoteStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <Select styles={customStyles} {...field} {...props} onChange={value => setValue(value)}/>
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}


const MyDateInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers
  return (
    <div>
      <label className={quickQuoteStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <DatePicker className={quickQuoteStyles.input} {...field} {...props} selected={field.value} onChange={value => setValue(value)}/>
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}

    </div>
  )
}

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label className={quickQuoteStyles.label} htmlFor={props.id || props.name}>{label}</label>
      <textarea className={quickQuoteStyles.textarea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={quickQuoteStyles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

const QuickQuote = () => {
  return (
    <div>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          products: '',
          zip:'',
          deliveryDate: '',
          pickupDate: '',
          instructions: ''
        }}

        validationSchema={Yup.object({
          fullName: Yup.string()
            .max(60, 'Must be 60 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phone: Yup.string()
            .required('Required'),
          zip: Yup.string()
            .required('Required'),
          // products: Yup.string()
          //   .required(),
          deliveryDate: Yup.date()
            .required('Required'),
          pickupDate: Yup.date()
            .required('Required'),
          instructions: Yup.string()
        })}

        onSubmit={ async (values, { setSubmitting, resetForm }) => {
          await sleep(500);
          try{
            const res = await axios.post(`${server}/api/quickQuote`, values)
            alert(res.data.status)
          } catch(err){
            alert(err)
          }
          resetForm()
        }}
      >
        <Form className={quickQuoteStyles.form}>
          <h2>Prompt Quote</h2>
          <div className={quickQuoteStyles.firstName}>
            <MyTextInput
              name="fullName"
              type="text"
              maxLength='60'
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
              autoComplete="tel-national"
              placeholder="Phone"
            />
          </div>
          <div className={quickQuoteStyles.products}>
            <MySelect
              name="products"
              id="products"
              placeholder="Select Products"
              name="products"
              isMulti
              options={options}
            />
          </div>
          <div className={quickQuoteStyles.zip}>
            <MyMaskedTextInput
              name="zip"
              mask="99999"
              maskChar=" "
              autoComplete="postal-code"
              placeholder="Zip Code"
            />
          </div>
          <div className={quickQuoteStyles.dates}>
            <div className={quickQuoteStyles.deliveryDate}>
              <MyDateInput
                id="deliveryDate"
                name="deliveryDate"
                dateFormat="MMMM d, yyyy"
                placeholderText="Delivery Date" 
              />
            </div>
          <div className={quickQuoteStyles.pickupDate}>
            <MyDateInput
              name="pickupDate"
              dateFormat="MMMM d, yyyy"
              placeholderText="Pickup Date" 
            />
          </div>
          </div>
          <div className={quickQuoteStyles.instructions}>
            <MyTextArea
              name="instructions"
              type="textarea"
              placeholder="Instructions"
            />
          </div>
          <button className={quickQuoteStyles.button} type="submit">SUBMIT</button>
        </Form> 
      </Formik>
    </div>
  )
}

export default QuickQuote
