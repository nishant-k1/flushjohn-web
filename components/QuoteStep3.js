import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import QuoteStep3Styles from '../styles/QuoteStep3.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'


const QuoteStep3 = () => {  
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <input className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </>
    )
  }
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </>
    )
  }

  return (
    <div>
      <Formik
        initialValues={formValues}

        validationSchema={Yup.object({
          deliveryDate: Yup.date()
            .required('Required'),
          pickupDate: Yup.date()
            .required('Required'),
          street: Yup.string()
            .required('Required'),
          city: Yup.string()
            .required('Required'),
          state: Yup.string()
            .required('Required'),
          zip: Yup.number()
            // .min(5, 'Invalid zip code')
            // .max(5, 'Invalid zip code')
            .required('Required'),
          hint: Yup.string(),
          onsite: Yup.string()
            .required('Required'),
          onsitePhone: Yup.string()
            .min(10, 'Invalid phone number')
            .max(14, 'Invalid phone number')
            .required('Required'),
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
      <div className={QuoteStep3Styles.section}>
        <div className={QuoteStep3Styles.container}>
          <Form className={QuoteStep3Styles.form}>
            <div className={QuoteStep3Styles.firstName}>
              <MyTextInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                maxLength='15'
                autoComplete="given-name"
                placeholder="Jane"
              />
            </div>

          <div className={QuoteStep3Styles.lastName}>
            <MyTextInput
                label="Pickup Date"
                name="pickupDate"
                type="date"
                maxLength='20'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="Street"
                name="street"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="City"
                name="city"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="State"
                name="state"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="Zip Code"
                name="zip"
                type="text"
                minLength='5'
                maxLength='5'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>
          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="Placement Location Hints"
                name="hint"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>
          <div className={QuoteStep3Styles.companyName}>
            <MyTextInput
                label="Onsite Person Name"
                name="onsite"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>
          <div className={QuoteStep3Styles.phone}>
            <MyMaskedTextInput
                label="Onsite Person Phone"
                name="onsitePhone"
                mask="(999) 999-9999"
                type="tel"
                autoComplete="tel-national"
                placeholder="(000) 000-0000"
              />
          </div>
          <button className={QuoteStep3Styles.button} type="submit">SUBMIT</button>
          <button onClick={() =>{setStep(2)}} className={QuoteStep3Styles.button}>BACK</button>

        </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default QuoteStep3
