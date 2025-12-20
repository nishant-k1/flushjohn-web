import React from "react";
import { FaTruckLoading } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { RiTimeFill } from "react-icons/ri";

const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL as string;

export interface Image {
  src: string;
  alt: string;
}

export interface Feature {
  id: number;
  image: React.ReactNode;
  title: string;
  body: string;
}

export interface Service {
  id: number;
  image: string;
  alt: string;
  title: string;
  body: string;
}

export interface LocationData {
  title: string;
  list: string[];
}

export interface HomeData {
  hero: {
    title: string;
    subTitle: string;
    image: Image;
    truckImg: Image;
  };
  features: {
    heading: string;
    content: Feature[];
  };
  services: {
    heading: string;
    content: Service[];
  };
  locations: LocationData;
}

export const home_data: HomeData = {
  hero: {
    title: `Portable Restroom Rentals Delivered Fast and Hassle-Free`,
    subTitle: `Events • Construction • Emergency`,
    image: {
      src: `https://cdn.flushjohn.com/images/home-page-images/hero-img-1.webp`,
      alt: "porta_potty",
    },
    truckImg: {
      src: ``,
      alt: "truck",
    },
  },
  features: {
    heading: "Why Choose FlushJohn for Porta Potty Rentals?",
    content: [
      {
        id: 1,
        image: <FaTruckLoading />,
        title: "Customer Support",
        body: "Our professional customer support ensures instant quote and bookings and are ready to address any issues or concerns that you may have, ensuring your satisfaction and peace of mind.",
      },
      {
        id: 2,
        image: <RiTimeFill />,
        title: "Delivery and Setup",
        body: "Our experienced yard manager and driver facilitates hassle-free delivery and setup services for your porta potties and handwash stations, saving your time and effort.",
      },
      {
        id: 3,
        image: <GiVacuumCleaner />,
        title: "Cleanliness",
        body: "We ensure that all our porta potties and handwash stations are thoroughly cleaned and sanitized before and after each use, using high-quality cleaning products and equipment.",
      },
    ],
  },
  services: {
    heading:
      "Our Comprehensive Porta Potty and Handwash Station Rental Services",
    content: [
      {
        id: 1,
        image: `${s3assets}/images/home-page-images/service-img-1.webp`,
        alt: "event_pic",
        title: "Event Porta John Rentals",
        body: "Perfect for weddings, festivals, and outdoor events. Clean, convenient portable toilets designed for guest comfort.",
      },
      {
        id: 2,
        image: `${s3assets}/images/home-page-images/service-img-4.webp`,
        alt: "construction_pic",
        title: "Construction Porta Potty Rentals",
        body: "Reliable sanitation for construction sites. OSHA-compliant units keep workers safe and productive. Long-term and short-term rentals available.",
      },
      {
        id: 3,
        image: `${s3assets}/images/home-page-images/service-img-2.webp`,
        alt: "renovation_pic",
        title: "Renovation Restroom Rentals",
        body: "Essential sanitation during home renovations. Quick delivery and setup for homeowners and contractors.",
      },
      {
        id: 4,
        image: `${s3assets}/images/home-page-images/service-img-3.webp`,
        alt: "relief_pic",
        title: "Disaster Relief Rentals",
        body: "Rapid deployment porta potty services for emergency situations and disaster relief efforts.",
      },
    ],
  },
  locations: {
    title:
      "Extensive service coverage: We're providing porta potty rentals across multiple locations",
    list: [
      "Houston, TX",
      "Dallas, TX",
      "Austin, TX",
      "San Antonio, TX",
      "Fort Worth, TX",

      "Miami, FL",
      "Orlando, FL",
      "Tampa, FL",
      "Jacksonville, FL",
      "Fort Lauderdale, FL",

      "Los Angeles, CA",
      "San Diego, CA",
      "Sacramento, CA",
      "San Jose, CA",
      "Fresno, CA",

      "Atlanta, GA",
      "Savannah, GA",
      "Augusta, GA",
      "Macon, GA",
      "Columbus, GA",

      "Chicago, IL",
      "Springfield, IL",
      "Peoria, IL",
      "Rockford, IL",
      "Naperville, IL",
    ],
  },
};
