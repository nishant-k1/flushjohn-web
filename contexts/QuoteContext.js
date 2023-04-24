import { createContext, useState } from "react";

export const QuoteContext = createContext();

export const requirementDetails = {
  SPR: "",
  DFR: "",
  ACR: "",
  HWS: "",
};
export const delivryDetails = {
  deliveryDate: "",
  pickupDate: "",
  street: "",
  zip: "",
  city: "",
  state: "",
  hint: "",
  onsitePhone: "",
};
export const personalDetails = {
  fName: "",
  lName: "",
  cName: "",
  email: "",
  phone: "",
};
export const QuoteContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    ...delivryDetails,
    ...requirementDetails,
    ...personalDetails,
  });

  return (
    <QuoteContext.Provider
      value={{ render: [step, setStep], data: [formValues, setFormValues] }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
