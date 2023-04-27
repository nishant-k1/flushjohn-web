import React from "react";
import { FaTruckLoading } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import { RiTimeFill } from "react-icons/ri";

export const home_data = {
  hero: {
    title:
      "We offer a wide range of portable toilet rentals and hand wash station rentals for all your events, job sites and residential needs.",
    image: {
      src: "assets/hero/hero_fm_1.png",
      alt: "porta_potty",
    },
  },
  features: {
    heading: "Our features and offerings",
    content: [
      {
        id: 1,
        image: <FaTruckLoading />,
        title: "Prompt Quote & Bookings",
        body: "We respect your time. Our professional customer support ensures instant quote and bookings.",
      },
      {
        id: 2,
        image: <GiVacuumCleaner />,
        title: "$15 Discount on Porta Potty Order.",
        body: "Our porta potty rentals are budget friendly and we provide a 15% discount on your 1st order.",
      },
      {
        id: 3,
        image: <RiTimeFill />,
        title: "Free & Quick Delivery",
        body: "Our experienced yard manager and driver facilitates seamless portable toilet delivery and pickup service with no any extra cost.",
      },
      // {
      //   id: 4,
      //   image: <GiVacuumCleaner />,
      //   title: "Free Porta Potty Servicing",
      //   body: "We provide weekly once cleaning service to our portable restrooms at no any extra cost. Also, we restock the porta potty unit with toilet papers.",
      // },
    ],
  },

  services: {
    h1: "Events",
    h2: "Job Sites",
    h3: "Renovations",
    h4: "Disaster Relief",
    p1: "Our porta toilets are highly suitable for all your events like birthday parties, family reunions, weddings, etc.",
    p2: "We offer porta potty rental near you for all your job site needs, whether be a construction or any other long term use.",
    p3: "If you have a house renovation, hotel renovation or bathroom remodeling going on, you can always rely on us for your need of porta potties.",
    p4: "We are always ready to supply portable equipments like portable toilet and handwash stations in the areas those affected by the disasters.",
  },

  locations: {
    title: "Our portable toilet service locations",
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

export const testimonials = {
  heading: "What do our customers say",
  content: [
    {
      image: {
        src: "/assets/testimony2.svg",
        alt: "https://www.reliableportable.com/",
      },
      title: "Terry Miles",
      body: "The porta potty arrived on time as promised and it was wonderful. They are best porta potty rental service provider.",
    },
    {
      image: {
        src: "/assets/testimony1.svg",
        alt: "https://www.reliableportable.com/",
      },
      title: "Dean Lacey",
      body: "I had to rent a hand wash station when my house renovation was going on and the only company on which I could rely on was Reliable Portable. They are very quick in responding to your requirements and relatively cheaper in price.",
    },
    {
      image: {
        src: "/assets/testimony2.svg",
        alt: "https://www.reliableportable.com/",
      },
      title: "Christine Barnes",
      body: "Ordered an event portable toilet unit for a family reunion. The portable toilet arrived the next day of my order.",
    },
    {
      image: {
        src: "/assets/testimony2.svg",
        alt: "https://www.reliableportable.com/",
      },
      title: "Janet Estremera",
      body: "Portable toilet was pretty and nice. I had it ordered for a weeding event on a weekend. As promised over the phone, they dropped it off on Friday and picked up on Monday.",
    },
  ],
};

export const products_data = {
  h1: "Standard Portable Restroom",
  h2: "Standard Portable Restroom",
  h3: "ADA-Compliant Portable Restroom",
  h4: "Flushable Restroom-Sink inside",
  h5: "Hand Washing Sink Station",
  h6: "Flushable Restroom-Sink inside",
  p1: "This is the most basic porta potty suited for events. It has a porta potty, urinal and toilet papers inside.",
  p2: "This a regular porta potty for job sites. It comes with toilet papers and a urinal inside.",
  p3: "The ADA toilets are larger in size than the regular restrooms and has wheel chair accessibility.",
  p4: "The flushable portable toilets for events has a flush and a sink. It is self-contained unit.",
  p5: "The standalone sink stations are self-contained and comes with soap and paper towels.",
  p6: "The flushable porta potties are self contained. It has a flush and a sink attached to it from inside.",
};

export const slide_show_data = {
  ESPR: "sps_#EF648A.svg",
  EDFR: "flushable.svg",
  EACR: "ada_blue.svg",
  EHWS: "sink.svg",
  CSPR: "sps_blue.svg",
  CDFR: "VIP-Flush-1.svg",
  CACR: "ada_blue.svg",
  CHWS: "sink.svg",
};
