import { NextSeo } from "next-seo";

const Home = () => (
  <>
    <NextSeo
      title="Reliable Portable | Porta Potty Rentals and Restroom Rentals"
      description="Book porta potty anywhere across united states for your events, job sites and residence. Cheapest porta potty rental in your area."
      keywords="Reliable Portable, Porta Potty Rental, porta potty site, portable restroom rental, porta toilet rental"
      language="English"
      canonical="https://www.reliableportable.com/"
      openGraph={{
        url: "https://www.reliableportable.com/",
        title:
          "Reliable Portable | Porta Potty Rentals and Restroom Rentals",
        description:
          "Book porta potty anywhere across united states for your events, job sites and residence. Cheapest porta potty rental in your area.",
        images: [
          {
            url: "icon.png",
            width: 800,
            height: 600,
            alt: "Og Image Alt",
          },
          {
            url: "icon.png",
            width: 900,
            height: 800,
            alt: "Og Image Alt Second",
          },
          { url: "icon.png" },
          { url: "icon.png" },
        ],
        type: "website",
        site_name: "Reliable Portable",
      }}
    />
    <p>Porta Potty Rental</p>
  </>
);

export default Page;
