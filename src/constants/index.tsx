import React from "react";
import { FaTruckLoading } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { RiTimeFill } from "react-icons/ri";

export const G_TAG_ID: string = process.env.NEXT_PUBLIC_G_TAG_ID as string;

export type apiBaseUrlsType = {
  CRM_RP_SERVICES_BASE_URL: string;
  CRM_RP_SOCKET_SERVICES_BASE_URL: string;
};

export const apiBaseUrls: apiBaseUrlsType = {
  CRM_RP_SERVICES_BASE_URL: process.env
    .NEXT_PUBLIC_CRM_RP_SERVICES_BASE_URL as string,
  CRM_RP_SOCKET_SERVICES_BASE_URL: process.env
    .NEXT_PUBLIC_CRM_RP_SOCKET_SERVICES_BASE_URL as string,
};

export type phoneType = {
  phone_link: string;
  phone_number: string;
};

export const phone: phoneType = {
  phone_link: process.env.NEXT_PUBLIC_PHONE_URL as string,
  phone_number: process.env.NEXT_PUBLIC_PHONE_NUMBER as string,
};

export const s3assets: string = process.env
  .NEXT_PUBLIC_CDN_S3_BUCKET_CLOUD_FRONT_URL as string;

export const websiteURL: string = process.env.NEXT_PUBLIC_WEBSITE_URL as string;

// Type definitions for various data structures
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

export interface Testimonial {
  image: Image;
  title: string;
  body: string;
}

export interface ProductImage {
  src_1: string;
  src_2: string;
  alt: string;
}

export interface Product {
  id: number;
  image: ProductImage;
  title: string;
  desc: string;
  keywords: string;
}

// Home data structure
export interface HomeData {
  hero: {
    title: string;
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
    title:
      "Clean, Convenient, and Reliable: Rent Top-Quality Porta Potties and Handwash Stations",
    image: {
      src: `${s3assets}/assets/home/hero/hero_fm_1.png`,
      alt: "porta_potty",
    },
    truckImg: {
      src: `${s3assets}/assets/home/hero/loadedTruck.png`,
      alt: "truck",
    },
  },
  features: {
    heading: "Why Choose Us for Your Sanitation Needs?",
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
      "Comprehensive Porta Potty and Handwash Station Rental Services: Meeting Your Sanitation Needs Anytime, Anywhere",
    content: [
      {
        id: 1,
        image: `${s3assets}/assets/home/services/services_event.jpg`,
        alt: "event_pic",
        title:
          "Event Sanitation Services: Providing Clean and Comfortable Restrooms for Your Guests",
        body: "When planning an event, one of the most important aspects to consider is providing adequate sanitation facilities for your guests. This is where event purpose porta potty and hand wash station rentals come in. Event purpose porta potties and hand wash rentals are specially designed to meet the unique needs of events, such as outdoor weddings, concerts, festivals, and sporting events.",
      },
      {
        id: 2,
        image: `${s3assets}/assets/home/services/hero_9.jpg`,
        alt: "construction_pic",
        title:
          "Construction Porta Potty Rentals: Keeping Your Job Site Safe and Hygienic",
        body: "Construction sites are notorious for being dirty and chaotic, but providing proper sanitation facilities is crucial for the health and well-being of workers. This is where construction unit porta potty rentals come in.",
      },
      {
        id: 3,
        image: `${s3assets}/assets/home/services/truck.jpeg`,
        alt: "renovation_pic",
        title:
          "Renovation Porta Potty Rentals: Providing Sanitation Solutions for Homeowners and Workers",
        body: "Home renovations can be messy and disruptive, but providing proper sanitation facilities is crucial for the comfort and well-being of homeowners and construction workers alike.",
      },
      {
        id: 4,
        image: `${s3assets}/assets/home/services/services_construction.jpg`,
        alt: "relief_pic",
        title:
          "Disaster Relief Porta Potty Rentals: Rapid Deployment and Reliable Support in Times of Crisis",
        body: "Disasters such as hurricanes, earthquakes, and floods can leave communities devastated and in need of immediate assistance. Providing proper sanitation facilities is crucial in such situations.",
      },
    ],
  },
  locations: {
    title:
      "Extensive service coverage: We're providing porta potty rentals across multiple locations",
    list: [
      "Alabama",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
};

// Testimonials data structure
export interface TestimonialsData {
  heading: string;
  content: Testimonial[];
}

export const testimonials: TestimonialsData = {
  heading: "What do our customers say",
  content: [
    {
      image: {
        src: `${s3assets}/assets/testimonial/testimony.svg`,
        alt: "https://www.flushjohn.com/",
      },
      title: "Terry Miles",
      body: "The porta potty arrived on time as promised and it was wonderful. They are best porta potty rental service provider.",
    },
    {
      image: {
        src: `${s3assets}/assets/testimonial/testimony1.svg`,
        alt: "https://www.flushjohn.com/",
      },
      title: "Dean Lacey",
      body: "I had to rent a hand wash station when my house renovation was going on and the only company on which I could rely on was Flush John. They are very quick in responding to your requirements and relatively cheaper in price.",
    },
    {
      image: {
        src: `${s3assets}/assets/testimonial/testimony2.svg`,
        alt: "https://www.flushjohn.com/",
      },
      title: "Christine Barnes",
      body: "Ordered an event portable toilet unit for a family reunion. The portable toilet arrived the next day of my order.",
    },
    {
      image: {
        src: `${s3assets}/assets/testimonial/testimony2.svg`,
        alt: "https://www.flushjohn.com/",
      },
      title: "Janet Estremera",
      body: "Portable toilet was pretty and nice. I had it ordered for a wedding event on a weekend. As promised over the phone, they dropped it off on Friday and picked up on Monday.",
    },
  ],
};

// Products data structure
export interface ProductsData {
  product_list: Product[];
}

export const products_data: ProductsData = {
  product_list: [
    {
      id: 1,
      image: {
        src_1: `${s3assets}/assets/products/sps_blue.svg`,
        src_2: `${s3assets}/assets/products/blueSPSInterior1.png`,
        alt: "Standard Portable Restroom",
      },
      title: "Standard Portable Restroom",
      desc: "A standard porta potty is a portable toilet that is perfect for outdoor events and construction sites, providing basic amenities and convenience for users.",
      keywords:
        "standard porta potty, portable restroom, outdoor toilet, basic amenities, construction site toilet",
    },
    {
      id: 2,
      image: {
        src_1: `${s3assets}/assets/products/adaCropped-removebg-preview.png`,
        src_2: `${s3assets}/assets/products/ADAInterior1.jpg`,
        alt: "ADA-Compliant Portable Restroom",
      },
      title: "ADA-Compliant Portable Restroom",
      desc: "The Americans with Disabilities Act (ADA) requires that all public events and job sites must have ADA-compliant porta potties available. These units are designed to accommodate individuals with disabilities.",
      keywords:
        "ADA-compliant toilet, accessible restroom, disability access, portable toilet, public event restroom",
    },
    {
      id: 3,
      image: {
        src_1: `${s3assets}/assets/products/FlushableCropped-removebg-preview.png`,
        src_2: `${s3assets}/assets/products/whiteFlushableInterior1.jpg`,
        alt: "Flushable Restroom-Sink Combo",
      },
      title: "Flushable Restroom-Sink Combo",
      desc: "A flushable portable restroom is a modern solution for outdoor events and job sites, providing the comfort of a regular bathroom with the convenience of portability.",
      keywords:
        "flushable restroom, portable sink, restroom-sink combo, outdoor bathroom, event restroom",
    },
    {
      id: 4, // Ensure this ID is unique (changed from 3 to 4)
      image: {
        src_1: `${s3assets}/assets/products/sinkFront.png`,
        src_2: `${s3assets}/assets/products/sink3Croppedremovebg.png`,
        alt: "Hand Wash Stations",
      },
      title: "Hand Wash Stations",
      desc: "Handwash stations provide a convenient and hygienic way for users to wash their hands. These units are often placed alongside porta potties to enhance the sanitation experience.",
      keywords:
        "hand wash station, hygiene, portable sink, sanitation, outdoor handwashing",
    },
  ],
};
