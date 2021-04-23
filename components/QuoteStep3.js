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
          zip: Yup.number()
            .min(5, 'Invalid zip code')
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
          <Form className={QuoteStep3Styles.form}>
            <div className={QuoteStep3Styles.deliveryDate}>
              <MyTextInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                maxLength='15'
                autoComplete="given-name"
                placeholder="Jane"
              />
            </div>

          <div className={QuoteStep3Styles.pickupDate}>
            <MyTextInput
                label="Pickup Date"
                name="pickupDate"
                type="date"
                maxLength='20'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.street}>
            <MyTextInput
                label="Street"
                name="street"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.city}>
            <MyTextInput
                label="City"
                name="city"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>

          <div className={QuoteStep3Styles.state}>
            <MySelect
                label="State"
                name="state"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              >
                  <option value="SS">Select State</option>
                  <option value="AK">Alaska</option>
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DC">Washington D.C.</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="IA">Iowa</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MD">Maryland</option>
                  <option value="ME">Maine</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="NE">Nebraska</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NV">Nevada</option>
                  <option value="NY">New York</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VA">Virginia</option>
                  <option value="VT">Vermont</option>
                  <option value="WA">Washington</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WV">West Virginia</option>
                  <option value="WY">Wyoming</option>
                  <option value="AA">Armed Forces Americas(except Canada)</option>
                  <option value="AE">Armed Forces Europe/Canada</option>
                  <option value="AP">Armed Forces Pacific</option>
                  <option value="AS">American Samoa</option>
                  <option value="FM">Federated States of Micronesia</option>
                  <option value="GU">Guam</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="PW">Palau</option>
                  <option value="VI">U.S.Virgin Islands</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NF">Newfoundland</option>
                  <option value="NS">Novia Scotia</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="PQ">Quebec</option>
                  <option value="SA">Saskatchewan</option>
                  <option value="YK">Yukon Territory</option>
            </MySelect>
          </div>

          <div className={QuoteStep3Styles.zip}>
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
          <div className={QuoteStep3Styles.hint}>
            <MyTextArea
                label="Placement Location Hints"
                name="hint"
                type="textarea"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>
          <div className={QuoteStep3Styles.onsite}>
            <MyTextInput
                label="Onsite Person Name"
                name="onsite"
                type="text"
                maxLength='50'
                autoComplete="family-name"
                placeholder="Doe"
              />
          </div>
          <div className={QuoteStep3Styles.onsitePhone}>
            <MyMaskedTextInput
                label="Onsite Person Phone"
                name="onsitePhone"
                mask="(999) 999-9999"
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
