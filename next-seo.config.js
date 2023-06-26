import { home_data } from "./constants";

export default {
  title:
    "Reliable Portable | Portable Restroom & Toilets Rental | Portable Toilet Rental",
  description:
    "Rent portable toilets and restrooms for your next event or construction site. Our clean and convenient solutions ensure a comfortable restroom experience for all.",
  keywords:
    "reliable porta potty rental, onsite services porta potty, portable bathroom rental, portable toilets on rent, porta potty rental",
  language: "English",
  canonical: "https://www.reliableportable.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.reliableportable.com",
    siteName: "Reliable Portable",
    title:
      "Reliable Portable | Portable Restroom & Toilets Rental | Portable Toilet Rental",
    description:
      "Rent portable toilets and restrooms for your next event or construction site. Our clean and convenient solutions ensure a comfortable restroom experience for all.",
    images: [
      {
        url: "https://www.reliableportable.com/favicon.svg",
        width: 520,
        height: 600,
        alt: "reliable_portable",
      },
      {
        url: "https://www.reliableportable.com/favicon.png",
        width: 520,
        height: 600,
        alt: "reliable_portable",
      },
    ],
    updated_time: "2023-06-26T12:34:56Z",
  },
  robotsProps: {
    noindex: false,
    nosnippet: true,
    maxSnippet: 165,
    noODP: false,
    noYDIR: false,
    notranslate: false,
    noimageindex: false,
    noarchive: true,
    maxImagePreview: "medium",
  },
};

export const localBusinessConfig = {
  type: "porta potty rental",
  id: "https://www.reliableportable.com",
  name: "Reliable Portable",
  description:
    "Rent portable toilets and restrooms for your next event or construction site. Our clean and convenient solutions ensure a comfortable restroom experience for all",
  url: "https://www.reliableportable.com/",
  openingHours: ["Monday-Friday 9:00-17:00"],
  rating: {
    ratingValue: "4.5",
    ratingCount: "2",
  },
  review: [
    {
      author: "Terry Miles",
      datePublished: "2020-12-04",
      name: "Best porta potty rental in the area",
      reviewBody:
        "The porta potty arrived on time as promised and it was wonderful. They are best porta potty rental service provider.",
      reviewRating: {
        bestRating: "5",
        worstRating: "1",
        reviewAspect: "Ambiance",
        ratingValue: "5",
      },
    },
    {
      author: "Dean Lacey",
      datePublished: "2021-06-15",
      name: "Best hand wash stations for rent available",
      reviewBody:
        "I had to rent a hand wash station when my house renovation was going on and the only company on which I could rely on was Reliable Portable. They are very quick in responding to your requirements and relatively cheaper in price.",
      reviewRating: {
        bestRating: "5",
        worstRating: "1",
        reviewAspect: "delivery",
        ratingValue: "5",
      },
    },
    {
      author: "Christine Barnes",
      datePublished: "2021-05-16",
      name: "trusted portable toilet rental",
      reviewBody:
        "Ordered an event portable toilet unit for a family reunion. The portable toilet arrived the next day of my order.",
      reviewRating: {
        bestRating: "5",
        worstRating: "1",
        reviewAspect: "service",
        ratingValue: "5",
      },
    },
    {
      author: "Janet Estremera",
      datePublished: "2022-07-29",
      name: "beautiful portable restroom rental",
      reviewBody:
        "Portable toilet was pretty and nice. I had it ordered for a weeding event on a weekend. As promised over the phone, they dropped it off on Friday and picked up on Monday.",
      reviewRating: {
        bestRating: "5",
        worstRating: "1",
        reviewAspect: "beauty",
        ratingValue: "4.5",
      },
    },
  ],
  areasServed: [...home_data.locations.list],
};
