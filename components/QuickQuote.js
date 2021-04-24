import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';
import quickQuoteStyles from '../styles/QuickQuote.module.css'

const QuickQuote = () => {
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
  
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
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
          zip: Yup.string()
            .required('Required'),
          deliveryDate: Yup.date()
            .required('Required'),
          pickupDate: Yup.date()
            .required('Required'),
          message: Yup.string()
          .min(1, 'Message cannot be empty')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
          resetForm()
        }}
      >
          <Form className={quickQuoteStyles.form}>
            <h2>Prompt Quote</h2>
            <div className={quickQuoteStyles.firstName}>
              <MyTextInput
                name="firstName"
                type="text"
                maxLength='15'
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
                <MyTextInput
                  label="Delivery Date"
                  name="deliveryDate"
                  type="date"
                  placeholder="Delivery Date"
                />
              </div>
            <div className={quickQuoteStyles.pickupDate}>
              <MyTextInput
                  label="Pickup Date"
                  name="pickupDate"
                  type="date"
                  placeholder="PickUp Date"
                />
            </div>
          </div>
          <div className={quickQuoteStyles.message}>
            <MyTextArea
                name="message"
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
