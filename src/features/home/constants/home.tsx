import React from "react";
import { FaTruckLoading } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { RiTimeFill } from "react-icons/ri";

const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL as string;

// Type definitions
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

// Home data structure
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
    title: `Porta Potty Rentals for Events & Construction`,
    subTitle: `Fast Delivery & Setup! Get an Instant Quote for Affordable, Hygienic Portable Toilet Rentals Near You.`,
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
        body: "Our professional customer support ensures instant quote and bookings and are ready to address any issues or concerns that you may have, ensuring your satisfaction and peace of mind. Looking for a porta potty rental for construction sites, weddings, or events? Get a Free Quote Now!",
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
        body: "Whether you're hosting a wedding, festival, or outdoor event, providing adequate sanitation is essential. Our wedding porta potty rental and festival portable toilets ensure cleanliness and convenience for all guests. This is where event purpose porta potty and hand wash station rentals come in. Event purpose porta potties and hand wash rentals are specially designed to meet the unique needs of events, such as outdoor weddings, concerts, festivals, and sporting events.",
      },
      {
        id: 2,
        image: `${s3assets}/images/home-page-images/service-img-4.webp`,
        alt: "construction_pic",
        title: "Construction Porta Potty Rentals And Hand Wash Station Rentals",
        body: "Construction sites require reliable sanitation. Our porta potty for construction sites is designed to keep workers safe and productive. Whether you need a long-term porta potty rental or a short-term solution, we've got you covered for the health and well-being of workers. This is where flushjohn Construction Porta Potty Rentals And Hand Wash Station Rentals come in. Worried about keeping your construction site compliant with OSHA regulations? Our porta potty rentals meet all safety standards, ensuring your workers have clean restrooms available 24/7.",
      },
      {
        id: 3,
        image: `${s3assets}/images/home-page-images/service-img-2.webp`,
        alt: "renovation_pic",
        title: "Portable Restroom Rentals For Renovations",
        body: "Renovations can be messy and disruptive, but providing proper sanitation facilities is crucial for the comfort and well-being of homeowners and construction workers alike. Our porta potty rental near me service ensures quick delivery and setup.",
      },
      {
        id: 4,
        image: `${s3assets}/images/home-page-images/service-img-3.webp`,
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
      // Texas (TX)
      "Houston, TX",
      "Dallas, TX",
      "Austin, TX",
      "San Antonio, TX",
      "Fort Worth, TX",

      // Florida (FL)
      "Miami, FL",
      "Orlando, FL",
      "Tampa, FL",
      "Jacksonville, FL",
      "Fort Lauderdale, FL",

      // California (CA)
      "Los Angeles, CA",
      "San Diego, CA",
      "Sacramento, CA",
      "San Jose, CA",
      "Fresno, CA",

      // Georgia (GA)
      "Atlanta, GA",
      "Savannah, GA",
      "Augusta, GA",
      "Macon, GA",
      "Columbus, GA",

      // Illinois (IL)
      "Chicago, IL",
      "Springfield, IL",
      "Peoria, IL",
      "Rockford, IL",
      "Naperville, IL",
    ],
  },
};

