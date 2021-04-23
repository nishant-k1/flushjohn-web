import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import QuoteStep1Styles from '../styles/QuoteStep1.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'
import MaskedInput from 'react-input-mask';

const QuoteStep1 = () => {  
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep1Styles.outerBox}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <div className={QuoteStep1Styles.innerBox}>
          <MaskedInput {...field} {...props} />
          <label htmlFor={props.id || props.name}>Units</label>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Formik
        initialValues={formValues}
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
              <MyMaskedTextInput
                label="Standard Portable Restroom"
                name="SPR"
                mask="9999"
                maskChar=" "
              />
            </div>
            <div className={QuoteStep1Styles.DFR}>
              <MyMaskedTextInput
                label="Deluxe Flushable Restroom"
                name="DFR"
                mask="9999"
                maskChar=" "
              />
            </div>
            <div className={QuoteStep1Styles.ACR}>
              <MyMaskedTextInput
                label="ADA Portable Restroom"
                name="ACR"
                mask="9999"
                maskChar=" "
              />
            </div>
            <div className={QuoteStep1Styles.HWS}>
              <MyMaskedTextInput
                label="Hand Wash Sink Station"
                name="HWS"
                mask="9999"
                maskChar=" "
              />
            </div>

          <button className={QuoteStep1Styles.button} type="submit">CONTINUE</button>
        </Form>
      </Formik>
    </div>
  )
}

export default QuoteStep1
