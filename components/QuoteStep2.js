import quoteStylesStep2 from '../styles/QuoteStep2.module.css'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const contact = () => {
  const [step, setStep] = useContext(QuoteContext)
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={`quoteStylesStep2.${props.name}`}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep2.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={`quoteStylesStep2.${props.name}`}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput className={quoteStylesStep2.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep2.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={quoteStylesStep2.message}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={quoteStylesStep2.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  
  return (
    <div>
      <Formik
        initialValues={{    
          fName: '',
          lName: '',
          cName: '',
          email: '',
          phone: ''
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
          setStep(3)
        }}
      >
        <div className={quoteStylesStep2.section}>
          <div className={quoteStylesStep2.container}>
            <Form className={quoteStylesStep2.form}>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                maxLength='15'
                autoComplete="given-name"
                placeholder="Jane"
              />

              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                maxLength='20'
                autoComplete="family-name"
                placeholder="Doe"
              />

              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                maxLength='20'
                autoComplete="family-name"
                placeholder="Doe"
              />

              <MyTextInput
                label="Company Name"
                name="cName"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@formik.com"
              />

              <MyMaskedTextInput
                label="Phone"
                name="phone"
                mask="(999) 999-9999"
                type="tel"
                autoComplete="tel-national"
                placeholder="(000) 000-0000"
              />

              <button onClick={() => {setStep(3)}} type="submit">CONTINUE</button>
              <button onClick={() => {setStep(1)}} type="submit">BACK</button>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  )
}

export default contact
