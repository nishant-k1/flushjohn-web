import { Poppins, Merriweather } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "600", "700"], // You can adjust weights
  subsets: ["latin"], // Ensure to include subsets like 'latin'
  variable: "--font-poppins", // CSS variable for easy reference
});

export const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});
