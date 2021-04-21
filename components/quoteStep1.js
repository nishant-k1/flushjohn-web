import quoteStylesStep1 from '../styles/QuoteStep1.module.css'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'
const contact = () => {
  const [step, setStep]  = useContext(QuoteContext)
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={`quoteStylesStep1.${props.name}`}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep1.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  
  return (
    <div>
      <Formik
        initialValues={{
          SPR: '',
          DFR: '',
          APR: '',
          HWS: '',
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          // render.setStep(2)
        }}
      >
        <div className={quoteStylesStep1.section}>
          <div className={quoteStylesStep1.container}>
            <Form className={quoteStylesStep1.form}>
                <MyTextInput
                  label="Standard Portable Restroom"
                  name="SPR"
                  type="tel"
                  maxLength='15'
                  placeholder="1"
                />

                <MyTextInput
                  label="Deluxe Flushable Restroom"
                  name="DFR"
                  type="tel"
                  maxLength='15'
                  placeholder="1"
                />

                <MyTextInput
                  label="ADA Compliant Portable Restroom"
                  name="APR"
                  type="tel"
                  maxLength='15'
                  placeholder="1"
                />

              <MyTextInput
                  label="Portable Hand Washing-Sink Station"
                  name="HWS"
                  type="tel"
                  maxLength='15'
                  placeholder="1"
              />
              <button onClick={() => {setStep(2)}} type="submit">CONTINUE</button>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  )
}

export default contact
