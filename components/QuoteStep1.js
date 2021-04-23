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
      <div className={QuoteStep1Styles.outerBox}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <div className={QuoteStep1Styles.innerBox}>
          <input {...field} {...props} />
          <label htmlFor={props.id || props.name}>Units</label>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          SPR: Yup.number(),
          DFR: Yup.number(),
          ACR: Yup.number(),
          HWS: Yup.number(),
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          setStep(2)
        }}
      >
          <Form className={QuoteStep1Styles.form}>
            <div className={QuoteStep1Styles.SPR}>
              <MyTextInput
                label="Standard Portable Restroom"
                name="SPR"
                type="number"
                maxLength='15'
                min="0"
              />
            </div>
            <div className={QuoteStep1Styles.DFR}>
              <MyTextInput
                label="Deluxe Flushable Restroom"
                name="DFR"
                type="number"
                maxLength='15'
                min="0"
              />
            </div>
            <div className={QuoteStep1Styles.ACR}>
              <MyTextInput
                label="ADA Compliant Portable Restroom"
                name="ACR"
                type="number"
                maxLength='15'
                min="0"
              />
            </div>
            <div className={QuoteStep1Styles.HWS}>
              <MyTextInput
                label="Hand Wash Sink Station"
                name="HWS"
                type="number"
                maxLength='15'
                min="0"
              />
            </div>

          <button className={QuoteStep1Styles.button} type="submit">CONTINUE</button>
        </Form>
      </Formik>
    </div>
  )
}

export default QuoteStep1
