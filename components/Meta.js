import { NextSeo } from 'next-seo';

const Home = () => (
  <>
    <NextSeo
      title="Rent A Porta - Home | porta potty rental california | porta potty rental near me | porta john rental New Jersey | portable restroom rental | rent a toilet"
      description="Book porta potty anywhere across united states for your events, job sites and residence. Cheapest porta potty rental in your area."
      canonical="https://www.rentaporta.com/"
      openGraph={{
        url: 'https://www.rentaporta.com/',
        title: 'Open Graph Title',
        description: 'Open Graph Description',
        images: [
          {
            url: 'icon.png',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
          {
            url: 'icon.png',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
          },
          { url: 'icon.png' },
          { url: 'icon.png' },
        ],
        site_name: 'Rent A Porta',
      }}
    />
    <p>Porta Potty Rental</p>
  </>
);

export default Page;