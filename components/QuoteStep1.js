import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import QuoteStep1Styles from '../styles/QuoteStep1.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const QuoteStep1 = () => {  
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data
  
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label className={QuoteStep1Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <input className={QuoteStep1Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep1Styles.error}>{meta.error}</div>
        ) : null}
      </>
    )
  }
  
  return (
    <div>
      <Formik
        initialValues={formValues}

        validationSchema={Yup.object({
          SPR: Yup.number()
            .max(15, 'Must be 15 characters or less'),
          DFR: Yup.number()
            .max(15, 'Must be 15 characters or less'),
          ACR: Yup.number()
            .max(15, 'Must be 15 characters or less'),
          HWS: Yup.number()
            .max(15, 'Must be 15 characters or less'),
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          setStep(2)
        }}
      >
      <div className={QuoteStep1Styles.section}>
        <div className={QuoteStep1Styles.container}>
          <Form className={QuoteStep1Styles.form}>
            <div className={QuoteStep1Styles.SPR}>
              <MyTextInput
                label="Standard Portable Restroom"
                name="SPR"
                type="number"
                maxLength='15'
              />
            </div>
            <div className={QuoteStep1Styles.DFR}>
              <MyTextInput
                label="Deluxe Flushable Restroom"
                name="DFR"
                type="number"
                maxLength='15'
              />
            </div>
            <div className={QuoteStep1Styles.ACR}>
              <MyTextInput
                label="ADA Compliant Portable Restroom"
                name="ACR"
                type="number"
                maxLength='15'
              />
            </div>
            <div className={QuoteStep1Styles.HWS}>
              <MyTextInput
                label="Hand Wash Sink Station"
                name="HWS"
                type="number"
                maxLength='15'
              />
            </div>

          <button className={QuoteStep1Styles.button} type="submit">CONTINUE</button>
        </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default QuoteStep1
