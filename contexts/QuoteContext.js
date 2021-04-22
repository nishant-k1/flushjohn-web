import {createContext, useState} from 'react'

export const QuoteContext = createContext()

export const QuoteContextProvider = ({children}) => {
  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState({
    SPR: '',
    DFR: '',
    ACR: '',
    HWS: '',
    fName: '',
    lName: '',
    cName: '',
    email: '',
    phone: '',
    deliveryDate: '',
    pickupDate: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    hint: '',
    onsite: '',
    onsitePhone: ''
  })


  return (
    <QuoteContext.Provider value={{render: [step, setStep],  data: [formValues, setFormValues]}}>
      {children}
    </QuoteContext.Provider>
  )
}
