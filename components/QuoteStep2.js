import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import QuoteStep2Styles from '../styles/QuoteStep2.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const QuoteStep2 = () => {  
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep2Styles.outerBox}>
        <label className={QuoteStep2Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <div className={QuoteStep2Styles.innerBox}>
          <input className={QuoteStep2Styles.input} {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className={QuoteStep2Styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    )
  }
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep2Styles.outerBox}>
        <label className={QuoteStep2Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <div className={QuoteStep2Styles.innerBox}>
          <MaskedInput className={QuoteStep2Styles.input} {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className={QuoteStep2Styles.error}>{meta.error}</div>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          fName: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          lName: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          cName: Yup.string()
            .max(120, 'Must be 120 characters or less'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phone: Yup.string()
            .required('Required')
        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          setStep(3)
        }}
      >
      <div className={QuoteStep2Styles.section}>
        <div className={QuoteStep2Styles.container}>
          <Form className={QuoteStep2Styles.form}>
            <div className={QuoteStep2Styles.fName}>
              <MyTextInput
                label="First Name"
                name="fName"
                type="text"
                maxLength='50'
                autoComplete="given-name"
                placeholder="Jane"
              />
            </div>

            <div className={QuoteStep2Styles.lName}>
              <MyTextInput
                  label="Last Name"
                  name="lName"
                  type="text"
                  maxLength='50'
                  autoComplete="family-name"
                  placeholder="Doe"
                />
            </div>

            <div className={QuoteStep2Styles.cName}>
              <MyTextInput
                  label="Company Name"
                  name="cName"
                  type="text"
                  maxLength='120'
                  autoComplete="organization"
                  placeholder="Acme Widget, Inc"
                />
            </div>

            <div className={QuoteStep2Styles.email}>
              <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@email.com"
                />
            </div>

            <div className={QuoteStep2Styles.phone}>
              <MyMaskedTextInput
                  label="Phone"
                  name="phone"
                  mask="(999) 999-9999"
                  autoComplete="tel-national"
                  placeholder="(000) 000-0000"
                />
            </div>
        <div className={`${QuoteStep2Styles.outerBox} ${QuoteStep2Styles.buttons}`}>
          <button type="submit">CONTINUE</button>
          <button onClick={() =>{setStep(1)}}>BACK</button>
        </div>

        </Form>
        </div>
      </div>
      </Formik>
    </div>
  )
}

export default QuoteStep2
