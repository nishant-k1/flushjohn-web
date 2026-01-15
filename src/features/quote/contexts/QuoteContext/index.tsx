"use client";

import React, { createContext, ReactNode } from "react";

const requirementDetails = {
  usageType: "",
  products: [], // Empty array - no items selected by default
};

const deliveryDetails = {
  deliveryDate: "",
  pickupDate: "",
  streetAddress: "",
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
  contactPersonPhone: "",
};

export const initialQuoteValues = {
  ...requirementDetails,
  ...deliveryDetails,
  ...personalDetails,
  leadSource: "Web Lead", // Add this to the combined initial values
};

type FormValues = typeof initialQuoteValues;

interface QuoteContextType {
  render: [number, React.Dispatch<React.SetStateAction<number>>];
  data: [FormValues, React.Dispatch<React.SetStateAction<FormValues>>];
  quoteRequested: boolean;
  setQuoteRequested: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: QuoteContextType = {
  render: [1, () => {}],
  data: [initialQuoteValues, () => {}],
  quoteRequested: false,
  setQuoteRequested: () => {},
};

export const QuoteContext =
  createContext<QuoteContextType>(defaultContextValue);

export const QuoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = React.useState<number>(1);

  const [formValues, setFormValues] =
    React.useState<FormValues>(initialQuoteValues);

  const [quoteRequested, setQuoteRequested] = React.useState<boolean>(false);

  return (
    <QuoteContext.Provider
      value={{
        setQuoteRequested,
        quoteRequested,
        render: [step, setStep],
        data: [formValues, setFormValues],
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
