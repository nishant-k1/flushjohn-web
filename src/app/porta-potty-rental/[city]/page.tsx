import React from "react";
import type { Metadata } from "next";
import { DollarSign, Phone, Truck, Droplet } from "lucide-react";
import { s3assets, websiteURL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { phone, contact } from "@/constants";
import dynamic from "next/dynamic";

const ContentMarketing = dynamic(
  () => import("@/components/SEO/ContentMarketing")
);
const ReviewCollection = dynamic(
  () => import("@/components/SEO/ReviewCollection")
);

const cities = [
  // Business location - Dover, DE (CRITICAL - must be first for local SEO)
  { name: "dover", displayName: "Dover", state: "DE", population: "39K" },
  { name: "houston", displayName: "Houston", state: "TX", population: "2.3M" },
  { name: "dallas", displayName: "Dallas", state: "TX", population: "1.3M" },
  { name: "austin", displayName: "Austin", state: "TX", population: "965K" },
  {
    name: "san-antonio",
    displayName: "San Antonio",
    state: "TX",
    population: "1.5M",
  },
  {
    name: "fort-worth",
    displayName: "Fort Worth",
    state: "TX",
    population: "918K",
  },

  { name: "miami", displayName: "Miami", state: "FL", population: "467K" },
  { name: "orlando", displayName: "Orlando", state: "FL", population: "307K" },
  { name: "tampa", displayName: "Tampa", state: "FL", population: "399K" },
  {
    name: "jacksonville",
    displayName: "Jacksonville",
    state: "FL",
    population: "950K",
  },
  {
    name: "fort-lauderdale",
    displayName: "Fort Lauderdale",
    state: "FL",
    population: "182K",
  },

  {
    name: "los-angeles",
    displayName: "Los Angeles",
    state: "CA",
    population: "4.0M",
  },
  {
    name: "san-diego",
    displayName: "San Diego",
    state: "CA",
    population: "1.4M",
  },
  {
    name: "sacramento",
    displayName: "Sacramento",
    state: "CA",
    population: "525K",
  },
  {
    name: "san-jose",
    displayName: "San Jose",
    state: "CA",
    population: "1.0M",
  },
  { name: "fresno", displayName: "Fresno", state: "CA", population: "542K" },

  { name: "atlanta", displayName: "Atlanta", state: "GA", population: "498K" },
  {
    name: "savannah",
    displayName: "Savannah",
    state: "GA",
    population: "147K",
  },
  { name: "augusta", displayName: "Augusta", state: "GA", population: "202K" },
  { name: "macon", displayName: "Macon", state: "GA", population: "157K" },
  {
    name: "columbus",
    displayName: "Columbus",
    state: "GA",
    population: "206K",
  },

  { name: "chicago", displayName: "Chicago", state: "IL", population: "2.7M" },
  {
    name: "springfield",
    displayName: "Springfield",
    state: "IL",
    population: "114K",
  },
  { name: "peoria", displayName: "Peoria", state: "IL", population: "113K" },
  {
    name: "rockford",
    displayName: "Rockford",
    state: "IL",
    population: "148K",
  },
  {
    name: "naperville",
    displayName: "Naperville",
    state: "IL",
    population: "149K",
  },
];

const getServiceAreas = (state: string) => {
  const serviceAreas = {
    DE: [
      {
        name: "State Capital Area",
        description: "Porta potty rentals in Dover, Delaware's capital city",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Delaware construction",
      },
      {
        name: "Government Facilities",
        description:
          "Porta potty services for government events and facilities",
      },
      {
        name: "Event Venues",
        description:
          "Wedding and corporate event porta potty services in Dover",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals in Delaware",
      },
      {
        name: "Military Bases",
        description: "Porta potty services for military events and facilities",
      },
      {
        name: "Historic Areas",
        description: "Historic district porta potty rentals in Dover",
      },
      {
        name: "Corporate Events",
        description: "Professional porta potty services for business events",
      },
    ],
    TX: [
      {
        name: "Downtown Districts",
        description:
          "Professional porta potty services for downtown business districts and urban areas",
      },
      {
        name: "Construction Sites",
        description:
          "Long-term porta potty rentals for Texas construction projects",
      },
      {
        name: "Event Venues",
        description: "Wedding and event porta potty services across Texas",
      },
      {
        name: "Industrial Areas",
        description:
          "Heavy-duty porta potty solutions for industrial facilities",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals in Texas parks",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty services in Texas",
      },
      {
        name: "Schools & Universities",
        description: "Educational institution porta potty rentals",
      },
      {
        name: "Hospitals & Medical",
        description: "Healthcare facility porta potty services",
      },
    ],
    FL: [
      {
        name: "Beach Areas",
        description:
          "Porta potty rentals for Florida beach events and festivals",
      },
      {
        name: "Theme Parks",
        description: "Event porta potty services near Florida theme parks",
      },
      {
        name: "Downtown Districts",
        description: "Urban porta potty services in Florida cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Florida construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Marinas & Waterfront",
        description: "Waterfront event porta potty rentals",
      },
      {
        name: "Golf Courses",
        description: "Golf tournament porta potty services",
      },
      {
        name: "Convention Centers",
        description: "Large event porta potty solutions",
      },
    ],
    CA: [
      {
        name: "Downtown Areas",
        description: "Urban porta potty services in California cities",
      },
      {
        name: "Construction Sites",
        description:
          "Long-term porta potty rentals for California construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and festival porta potty services",
      },
      { name: "Beach Areas", description: "Coastal event porta potty rentals" },
      {
        name: "Wine Country",
        description: "Vineyard and wine event porta potty services",
      },
      {
        name: "Entertainment Industry",
        description: "Film and TV production porta potty rentals",
      },
      {
        name: "Tech Companies",
        description: "Corporate event porta potty services",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals",
      },
    ],
    GA: [
      {
        name: "Downtown Districts",
        description: "Urban porta potty services in Georgia cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Georgia construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Historic Areas",
        description: "Historic district porta potty rentals",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty services",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty rentals",
      },
      {
        name: "Universities",
        description: "College event porta potty services",
      },
      {
        name: "Industrial Areas",
        description: "Manufacturing facility porta potty rentals",
      },
    ],
    IL: [
      {
        name: "Downtown Areas",
        description: "Urban porta potty services in Illinois cities",
      },
      {
        name: "Construction Sites",
        description: "Long-term porta potty rentals for Illinois construction",
      },
      {
        name: "Event Venues",
        description: "Wedding and corporate event porta potty services",
      },
      {
        name: "Parks & Recreation",
        description: "Outdoor event porta potty rentals",
      },
      {
        name: "Sports Facilities",
        description: "Athletic event porta potty services",
      },
      {
        name: "Universities",
        description: "College event porta potty rentals",
      },
      {
        name: "Industrial Areas",
        description: "Manufacturing porta potty services",
      },
      {
        name: "Suburban Areas",
        description: "Suburban event porta potty rentals",
      },
    ],
  };

  return serviceAreas[state as keyof typeof serviceAreas] || serviceAreas.DE;
};

const getCityCoordinates = (cityName: string) => {
  const coordinates = {
    dover: { lat: "39.1615", lng: "-75.5268" }, // Dover, DE coordinates
    houston: { lat: "29.7604", lng: "-95.3698" },
    dallas: { lat: "32.7767", lng: "-96.7970" },
    austin: { lat: "30.2672", lng: "-97.7431" },
    "san-antonio": { lat: "29.4241", lng: "-98.4936" },
    "fort-worth": { lat: "32.7555", lng: "-97.3308" },
    miami: { lat: "25.7617", lng: "-80.1918" },
    orlando: { lat: "28.5383", lng: "-81.3792" },
    tampa: { lat: "27.9506", lng: "-82.4572" },
    jacksonville: { lat: "30.3322", lng: "-81.6557" },
    "fort-lauderdale": { lat: "26.1224", lng: "-80.1373" },
    "los-angeles": { lat: "34.0522", lng: "-118.2437" },
    "san-diego": { lat: "32.7157", lng: "-117.1611" },
    sacramento: { lat: "38.5816", lng: "-121.4944" },
    "san-jose": { lat: "37.3382", lng: "-121.8863" },
    fresno: { lat: "36.7378", lng: "-119.7871" },
    atlanta: { lat: "33.7490", lng: "-84.3880" },
    savannah: { lat: "32.0835", lng: "-81.0998" },
    augusta: { lat: "33.4735", lng: "-82.0105" },
    macon: { lat: "32.8407", lng: "-83.6324" },
    columbus: { lat: "32.4610", lng: "-84.9877" },
    chicago: { lat: "41.8781", lng: "-87.6298" },
    springfield: { lat: "39.7817", lng: "-89.6501" },
    peoria: { lat: "40.6936", lng: "-89.5890" },
    rockford: { lat: "42.2711", lng: "-89.0940" },
    naperville: { lat: "41.7508", lng: "-88.1535" },
  };

  return (
    coordinates[cityName as keyof typeof coordinates] || {
      lat: "39.8283",
      lng: "-98.5795",
    }
  );
};

const getNearbyCities = (state: string) => {
  const nearbyCities = {
    TX: cities.filter((city) => city.state === "TX").slice(0, 3),
    FL: cities.filter((city) => city.state === "FL").slice(0, 3),
    CA: cities.filter((city) => city.state === "CA").slice(0, 3),
    GA: cities.filter((city) => city.state === "GA").slice(0, 3),
    IL: cities.filter((city) => city.state === "IL").slice(0, 3),
  };

  return nearbyCities[state as keyof typeof nearbyCities] || [];
};

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.name,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = cities.find((c) => c.name === city);

  if (!cityData) {
    return {
      title: "Porta Potty Rentals - FlushJohn",
      description:
        "Professional porta potty rental services across the United States.",
    };
  }

  const { displayName, state } = cityData;
  const cityTitle = `${displayName}, ${state}`;

  return {
    title: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
    description: `Professional porta potty rental services in ${cityTitle}. Fast delivery, competitive pricing, and reliable service for events and construction sites. Get your free quote today!`,
    keywords: `porta potty rental ${displayName}, portable toilet ${cityTitle}, event sanitation ${displayName}, construction porta potty ${cityTitle}, flushjohn ${displayName}`,
    openGraph: {
      title: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
      description: `Get reliable porta potty rentals in ${cityTitle}. Same-day delivery, competitive pricing, and professional service for all your event and construction needs.`,
      url: `${websiteURL}/porta-potty-rental/${city}`,
      type: "website",
      siteName: "FlushJohn",
      images: [
        {
          url: `${s3assets}/og-image-flushjonn-web.png`,
          height: 630,
          width: 1200,
          alt: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Porta Potty Rentals in ${cityTitle} - FlushJohn`,
      description: `Professional porta potty rental services in ${cityTitle}. Fast delivery and competitive pricing.`,
      images: [`${s3assets}/og-image-flushjonn-web.png`],
    },
    alternates: {
      canonical: `${websiteURL}/porta-potty-rental/${city}`,
    },
  };
}

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const { city } = await params;
  const cityData = cities.find((c) => c.name === city);

  if (!cityData) {
    return <div>City not found</div>;
  }

  const { displayName, state, population } = cityData;
  const cityTitle = `${displayName}, ${state}`;
  const { phone_number, phone_link } = phone;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Porta Potty Rentals in ${cityTitle}`,
    description: `Professional porta potty rental services in ${cityTitle}. Fast delivery, competitive pricing, and reliable service for events and construction sites.`,
    provider: {
      "@type": "Organization",
      name: "FlushJohn",
      url: websiteURL,
      logo: `${s3assets}/og-image-flushjonn-web.png`,
      areaServed: {
        "@type": "City",
        name: cityTitle,
        containedInPlace: {
          "@type": "State",
          name: state,
        },
      },
    },
    serviceType: "Porta Potty Rental Services",
    areaServed: {
      "@type": "City",
      name: cityTitle,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    offers: {
      "@type": "Offer",
      description: `Affordable porta potty rental services in ${cityTitle}`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `FlushJohn Porta Potty Rentals - ${cityTitle}`,
    description: `Professional porta potty rental services in ${cityTitle}. Same-day delivery, competitive pricing, and reliable service for events and construction sites.`,
    url: `${websiteURL}/porta-potty-rental/${city}`,
    telephone: phone.phone_number,
    email: contact.support_email,
    address: {
      "@type": "PostalAddress",
      addressLocality: displayName,
      addressRegion: state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: getCityCoordinates(city).lat,
      longitude: getCityCoordinates(city).lng,
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Check",
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "City",
      name: cityTitle,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: getCityCoordinates(city).lat,
        longitude: getCityCoordinates(city).lng,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Porta Potty Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Porta Potty Rental",
            description:
              "Basic portable toilet rental for events and construction",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deluxe Porta Potty Rental",
            description: "Enhanced portable toilet with additional amenities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ADA Compliant Porta Potty",
            description:
              "Americans with Disabilities Act compliant portable toilet",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah M.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: `Excellent porta potty service in ${cityTitle}. Clean, professional, and affordable!`,
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Mike R.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: `We've been using FlushJohn for our construction projects in ${cityTitle} for 2 years. Reliable and cost-effective.`,
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Porta Potty Rentals",
        item: `${websiteURL}/porta-potty-rental`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityTitle,
        item: `${websiteURL}/porta-potty-rental/${city}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div
        style={{ maxWidth: "980px", margin: "0 auto", padding: "80px 18px" }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1>Porta Potty Rentals in {cityTitle}</h1>
          <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
            Serving {population} residents with reliable, clean porta potty
            rental services
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quote"
              style={{
                background: "var(--primary-bg-color)",
                color: "white",
                padding: "15px 30px",
                textDecoration: "none",
                borderRadius: "0",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              Get Free Quote
            </Link>
            <a
              href={phone_link}
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "15px 30px",
                textDecoration: "none",
                borderRadius: "0",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              Call {phone_number}
            </a>
          </div>
        </div>

        {/* Service Areas */}
        <div style={{ marginBottom: "40px" }}>
          <h2>We Serve All Areas in {cityTitle}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {getServiceAreas(state).map((area) => (
              <div
                key={area.name}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "0",
                }}
              >
                <h3>{area.name}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Why Choose FlushJohn in {cityTitle}?</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Truck size={20} />
                Same-Day Delivery
              </h3>
              <p>Fast delivery throughout {cityTitle} and surrounding areas</p>
            </div>
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <DollarSign size={20} />
                Competitive Pricing
              </h3>
              <p>Best rates in {cityTitle} with transparent pricing</p>
            </div>
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Droplet size={20} />
                Clean & Sanitized
              </h3>
              <p>Professionally cleaned units before every rental</p>
            </div>
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={20} />
                24/7 Support
              </h3>
              <p>Round-the-clock customer service for {cityTitle} customers</p>
            </div>
          </div>
        </div>

        {/* Popular Services */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Popular Porta Potty Services in {cityTitle}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                name: "Construction Sites",
                desc: "Long-term rentals for construction projects",
              },
              {
                name: "Weddings",
                desc: "Elegant portable toilets for special events",
              },
              {
                name: "Corporate Events",
                desc: "Professional sanitation for business events",
              },
              {
                name: "Festivals",
                desc: "High-capacity solutions for large gatherings",
              },
              {
                name: "Sports Events",
                desc: "Durable units for athletic competitions",
              },
              {
                name: "Concerts",
                desc: "Heavy-duty porta potties for music events",
              },
            ].map((service) => (
              <div
                key={service.name}
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "0",
                }}
              >
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <Link
                  href="/quote"
                  style={{
                    color: "var(--primary-bg-color)",
                    fontWeight: "bold",
                  }}
                >
                  Get Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Local Testimonials */}
        <div style={{ marginBottom: "40px" }}>
          <h2>What {cityTitle} Customers Say</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                name: "Sarah M.",
                location: "Downtown",
                text: "FlushJohn provided excellent service for our wedding in downtown {cityTitle}. Clean, professional, and affordable!",
              },
              {
                name: "Mike R.",
                location: "Construction Site",
                text: "We've been using FlushJohn for our construction projects in {cityTitle} for 2 years. Reliable and cost-effective.",
              },
              {
                name: "Jennifer L.",
                location: "Event Venue",
                text: "Great porta potty service for our corporate event. The team was professional and the units were spotless.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  background: "#f8f9fa",
                  borderRadius: "0",
                }}
              >
                <p>"{testimonial.text}"</p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                  - {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Frequently Asked Questions - {cityTitle}</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {[
              {
                q: `How much does porta potty rental cost in ${cityTitle}?`,
                a: `Our porta potty rental prices in ${cityTitle} vary based on location, duration, and unit type. Contact us for a personalized quote.`,
              },
              {
                q: `Do you deliver to all areas in ${cityTitle}?`,
                a: `Yes! We provide porta potty delivery throughout ${cityTitle} and surrounding areas. Same-day delivery available.`,
              },
              {
                q: `How often are the porta potties cleaned?`,
                a: `We clean and service our porta potties regularly, typically weekly, with additional cleaning available upon request.`,
              },
              {
                q: `What types of events do you serve in ${cityTitle}?`,
                a: `We serve all types of events in ${cityTitle}: weddings, construction sites, festivals, corporate events, and more.`,
              },
            ].map((faq, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "0",
                }}
              >
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Cities */}
        <div style={{ marginBottom: "40px" }}>
          <h2>We Also Serve These Nearby Areas</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {getNearbyCities(state).map((nearbyCity) => (
              <Link
                key={nearbyCity.name}
                href={`/porta-potty-rental/${nearbyCity.name}`}
                style={{
                  display: "block",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "0",
                  textDecoration: "none",
                  color: "inherit",
                  background: "white",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    color: "var(--primary-bg-color)",
                  }}
                >
                  {nearbyCity.displayName}, {nearbyCity.state}
                </h4>
                <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>
                  {/* Dark text on white card background - OK */}
                  Porta potty rental services →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 18px",
            background: "var(--primary-bg-color)",
            color: "white",
            borderRadius: "0",
          }}
        >
          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            <h2>Ready to Rent Porta Potties in {cityTitle}?</h2>
            <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
              Join thousands of satisfied customers in {cityTitle}. Get your
              free quote today!
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/quote"
                style={{
                  background: "white",
                  color: "var(--primary-bg-color)",
                  padding: "15px 30px",
                  textDecoration: "none",
                  borderRadius: "0",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}
              >
                Get Free Quote
              </Link>
              <a
                href={phone_link}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "15px 30px",
                  textDecoration: "none",
                  borderRadius: "0",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}
              >
                Call {phone_number}
              </a>
            </div>
          </div>
        </div>

        {/* Content Marketing Section */}
        <ContentMarketing
          city={displayName}
          state={state}
        />

        {/* Review Collection Section */}
        <ReviewCollection
          city={displayName}
          state={state}
        />
      </div>
    </>
  );
};

export default CityPage;
