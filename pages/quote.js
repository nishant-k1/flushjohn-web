import QuoteStep1 from '../components/quoteStep1'
import QuoteStep2 from '../components/quoteStep2'
import QuoteStep3 from '../components/quoteStep3'
import quoteProgressStyles from '../styles/QuoteProgress.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const quote = () => {
  const [step, setStep]  = useContext(QuoteContext)
  return (
    <div className={quoteProgressStyles.section}>
      <div className={quoteProgressStyles.container}>
        <div className={quoteProgressStyles.progressBar}>
          <div className={`${quoteProgressStyles.step} ${step === 1 || step === 2 || step === 3 ? `${quoteProgressStyles.active}` : null}`} >Step1: Requirement Information</div>
          <div className={`${quoteProgressStyles.step} ${step === 2 || step === 3 ? `${quoteProgressStyles.active}` : null}`} >Step2: Personal Information</div>
          <div className={`${quoteProgressStyles.step} ${step === 3 ? `${quoteProgressStyles.active}` : null}`} >Step3: Delivery Information</div>
        </div>
        <div>
          {step === 1 ? <QuoteStep1 /> : null}
          {step === 2 ? <QuoteStep2 /> : null}
          {step === 3 ? <QuoteStep3 /> : null}
        </div>
      </div>
    </div>
  )
}

export default quote
