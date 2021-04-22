import quoteStylesStep1 from '../styles/QuoteStep1.module.css'
import {useContext} from 'react'
import {QuoteContext} from '../contexts/QuoteContext'

const QuoteStep1 = () => {
  const {render, data} = useContext(QuoteContext)
  const [step, setStep] = render
  const [formValues, setFormValues] = data

  const handleChange = (event) => {
    setFormValues({...formValues, [event.target.name]: event.target.value })
  }

  const validateStep1 = () => {
    const errors = {}
    if(!formValues.SPR){
      errors.SPR="Required"
    }
    if(!formValues.SPR){
      errors.DFR="Required"
    }
    if(!formValues.SPR){
      errors.ACR="Required"
    }
    if(!formValues.SPR){
      errors.HWS="Required"
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(JSON.stringify(formValues))
  }



  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="SPR">Standard Portable Restroom</label>
        <input onChange={handleChange} type="number" name='SPR' />
      </div>
      <div>
        <label htmlFor="DFR">Standard Portable Restroom</label>
        <input onChange={handleChange} type="number" name='DFR' />
      </div>
      <div>
        <label htmlFor="ACR">Standard Portable Restroom</label>
        <input onChange={handleChange} type="number" name='ACR' />
      </div>
      <div>
        <label htmlFor="HWS">Standard Portable Restroom</label>
        <input onChange={handleChange} type="number" name='HWS' />
      </div>
      <button type='submit'>
        SUBMIT
      </button>
    </form>
  )
}


export default QuoteStep1
