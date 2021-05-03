import QuoteStep1 from '../components/QuoteStep1'
import QuoteStep2 from '../components/QuoteStep2'
import QuoteStep3 from '../components/QuoteStep3'
import quoteProgressStyles from '../styles/QuoteProgress.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const quote = () => {
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data
  return (
    <div className={quoteProgressStyles.section}>
      <div className={quoteProgressStyles.container}>
        <div className={quoteProgressStyles.progressBar}>
          <div className={`${quoteProgressStyles.step} ${step === 1 || step === 2 || step === 3 ? `${quoteProgressStyles.active}` : null}`} ><b>Step1</b>Requirement Information</div>
          <div className={`${quoteProgressStyles.step} ${step === 2 || step === 3 ? `${quoteProgressStyles.active}` : null}`} ><b>Step2</b>Personal Information</div>
          <div className={`${quoteProgressStyles.step} ${step === 3 ? `${quoteProgressStyles.active}` : null}`} ><b>Step3</b>Delivery Information</div>
        </div>
        <div className={quoteProgressStyles.innerSection}>
          {step === 1 ? <QuoteStep1 /> : null}
          {step === 2 ? <QuoteStep2 /> : null}
          {step === 3 ? <QuoteStep3 /> : null}
        </div>
      </div>
    </div>
  )
}

export default quote
