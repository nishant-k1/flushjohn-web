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
      <div className={QuoteStep3Styles.outerBox}>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <input className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }
  const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep3Styles.outerBox}>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <textarea className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep3Styles.outerBox}>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <select className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </div>
    )
  }

  const MyMaskedTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className={QuoteStep3Styles.outerBox}>
        <label className={QuoteStep3Styles.label} htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput className={QuoteStep3Styles.input} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={QuoteStep3Styles.error}>{meta.error}</div>
        ) : null}
      </div>
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
          zip: Yup.string()
            .required('Required'),
          hint: Yup.string(),
          onsite: Yup.string()
            .required('Required'),
          onsitePhone: Yup.string()
            .required('Required')

        })}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
          <Form className={QuoteStep3Styles.form}>
            <div className={QuoteStep3Styles.deliveryDate}>
              <MyTextInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
              />
            </div>

          <div className={QuoteStep3Styles.pickupDate}>
            <MyTextInput
                label="Pickup Date"
                name="pickupDate"
                type="date"
              />
          </div>

          <div className={QuoteStep3Styles.street}>
            <MyTextInput
                label="Street"
                name="street"
                type="text"
                autoComplete="street-address"
                placeholder="Street-address"
              />
          </div>

          <div className={QuoteStep3Styles.city}>
            <MyTextInput
                label="City"
                name="city"
                type="text"
                autoComplete="city"
                placeholder="City"
              />
          </div>

          <div className={QuoteStep3Styles.state}>
            <MySelect
              label="State"
              name="state"
              type="text"
              autoComplete="state"
            >
                <option value="SS">Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="Gu">Guam</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="MP">Northern Mariana Is</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VI">Virgin Islands</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </MySelect>
          </div>

          <div className={QuoteStep3Styles.zip}>
            <MyMaskedTextInput
                label="Zip Code"
                name="zip"
                mask="99999"
                maskChar=" "
                autoComplete="postal-code"
                placeholder="00000"
              />
          </div>
          <div className={QuoteStep3Styles.hint}>
            <MyTextArea
                label="Placement Instructions"
                name="hint"
                type="textarea"
                placeholder="Placement guidelines, backyard, frontyard, park etc"
              />
          </div>
          <div className={QuoteStep3Styles.onsite}>
            <MyTextInput
                label="Onsite Person Name"
                name="onsite"
                type="text"
                autoComplete="family-name"
                placeholder="Onsite Person Name"
              />
          </div>
          <div className={QuoteStep3Styles.onsitePhone}>
            <MyMaskedTextInput
                label="Onsite Person Phone"
                name="onsitePhone"
                mask="(999) 999-9999"
                maskChar=" "
                type="tel"
                autoComplete="tel-national"
                placeholder="(000) 000-0000"
              />
          </div>

          <div className={`${QuoteStep3Styles.outerBox} ${QuoteStep3Styles.buttons}`}>
            <button type="submit">SUBMIT</button>
            <button onClick={() =>{setStep(2)}}>BACK</button>
          </div>

        </Form>
      </Formik>
    </div>
  )
}

export default QuoteStep3
