"use client";

import React, { createContext, ReactNode } from "react";

// Define the structure for the requirement details
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

// Define the structure for the delivery details
const deliveryDetails = {
  deliveryDate: "",
  pickupDate: "",
  streetAddress: "",
  zip: "",
  city: "",
  state: "",
  instructions: "",
};

// Define the structure for personal details
const personalDetails = {
  fName: "",
  lName: "",
  cName: "",
  email: "",
  phone: "",
  contactPersonName: "",
  contactPersonPhone: "",
};

// Combine all initial values into one object
export const initialQuoteValues = {
  ...requirementDetails,
  ...deliveryDetails,
  ...personalDetails,
  leadSource: "Web Lead", // Add this to the combined initial values
};

// Define the type for the form values
type FormValues = typeof initialQuoteValues;

// Define the type for the context
interface QuoteContextType {
  render: [number, React.Dispatch<React.SetStateAction<number>>];
  data: [FormValues, React.Dispatch<React.SetStateAction<FormValues>>];
}

const defaultContextValue: QuoteContextType = {
  render: [1, () => {}],
  data: [initialQuoteValues, () => {}],
};

// Initialize the context with default values
export const QuoteContext =
  createContext<QuoteContextType>(defaultContextValue);

// Define the provider component
export const QuoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = React.useState<number>(1);

  const [formValues, setFormValues] =
    React.useState<FormValues>(initialQuoteValues);

  return (
    <QuoteContext.Provider
      value={{ render: [step, setStep], data: [formValues, setFormValues] }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
