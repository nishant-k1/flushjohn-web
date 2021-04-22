import quoteStylesStep3 from '../styles/QuoteStep3.module.css'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const QuoteStep3 = () => {
  const [step, setStep] = useContext(QuoteContext)
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={`quoteStylesStep3.${props.name}`}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep3.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={`quoteStylesStep3.${props.name}`}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput className={quoteStylesStep3.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep3.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={quoteStylesStep3.message}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep3.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  
  return (
    <div>
      <Formik
        initialValues={{
          deliveryDate: '',
          pickupDate: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          hint: '',
          onsite: '',
          onsitePhone: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phone: Yup.string()
            .required('Required'),
          message: Yup.string()
            .min(1, 'Message cannot be empty')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(initialValues)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
      <div className={quoteStylesStep3.section}>
        <div className={quoteStylesStep3.container}>
          <Form className={quoteStylesStep3.form}>
              <MyTextInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
              />

              <MyTextInput
                label="Pickup Date"
                name="pickupDate"
                type="date"
              />

              <MyTextInput
                label="Street Address"
                name="street"
                type="text"
                autoComplete="address-line1"
                placeholder="Street Address"
              />

              <MyTextInput
                label="City"
                name="city"
                type="text"
                autoComplete="address-line2"
                placeholder="City"
              />

              <MyTextInput
                label="City"
                name="State"
                type="text"
                autoComplete="address-line3"
                placeholder="State"
              />

              <MyTextInput
                label="Zip Code"
                name="zip"
                type="tel"
                autoComplete="address-line4"
                maxLength='5'
                minLength='5'
                placeholder="00000"
              />

              <MyTextArea
                label="Placement Location Hint"
                name="hint"
                type="textarea"
                placeholder="Any landmark, backyard, frontyard etc"
              />

              <MyTextInput
                label="Onsite Person Name"
                name="onsite"
                type="text"
                maxLength='35'
                autoComplete="name"
                placeholder="Jane Wilson"
              />

              <MyMaskedTextInput
                label="Onsite Person Phone"
                name="onsitePhone"
                mask="(999) 999-9999"
                type="tel"
                autoComplete="tel-national"
                placeholder="(000) 000-0000"
              />
            <button type="submit">SUBMIT</button>
            <button onClick={() => {setStep(2)}} type="submit">BACK</button>
          </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default QuoteStep3
