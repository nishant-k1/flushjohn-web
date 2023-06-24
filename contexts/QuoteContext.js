import { createContext, useState } from "react";

export const QuoteContext = createContext();

const requirementDetails = {
  usageType: "",
  products: [
    {
      name: "Standard Portable Restroom",
      qty: "",
    },
    { name: "Deluxe Flushable Restroom", qty: "" },
    { name: "ADA Portable Restroom", qty: "" },
    { name: "Hand Wash Station", qty: "" },
  ],
};

const deliveryDetails = {
  deliveryDate: "",
  pickupDate: "",
  street: "",
  zip: "",
  city: "",
  state: "",
  instructions: "",
};

const personalDetails = {
  fName: "",
  lName: "",
  cName: "",
  email: "",
  phone: "",
  contactPersonName: "",
  onsitePhone: "",
};

export const initialQuoteValues = {
  ...requirementDetails,
  ...deliveryDetails,
  ...personalDetails,
};

export const QuoteContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    ...requirementDetails,
    ...deliveryDetails,
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
