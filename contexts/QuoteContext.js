import {createContext, useState} from 'react'

export const QuoteContext = createContext()

export const QuoteContextProvider = ({children}) => {
  const [step, setStep] = useState(1)
  return (
    <QuoteContext.Provider value={[step, setStep]}>
      {children}
    </QuoteContext.Provider>
  )
}
