import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-input-mask';

const contact = () => {
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    )
  }
  
  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    )
  }

  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea className="text-textarea" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
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
            .min(10, 'Invalid phone number')
            .max(10, 'Invalid phone number')
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
        }}
      >
        <Form>
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

          <MyTextArea
            label="Message"
            name="message"
            type="textarea"
            placeholder="Message"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default contact
