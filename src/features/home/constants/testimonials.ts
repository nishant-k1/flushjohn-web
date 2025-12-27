
const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL as string;

export interface Image {
  src: string;
  alt: string;
}

export interface Testimonial {
  image: Image;
  title: string;
  body: string;
}

export interface TestimonialsData {
  heading: string;
  content: Testimonial[];
}

export const testimonials: TestimonialsData = {
  heading: "What do our customers say",
  content: [
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-1.webp`,
        alt: "Terry Miles testimonial for FlushJohn porta potty rentals",
      },
      title: "Terry Miles - Construction Site Manager, Houston, TX",
      body: "We've been using FlushJohn for our construction projects in Houston for over a year. Their vendor network is reliable, and the units are always clean and well-maintained. The pricing is competitive, and they handle all the coordination for us.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-2.webp`,
        alt: "Dean Lacey testimonial for FlushJohn hand wash station rental",
      },
      title: "Dean Lacey - Homeowner, Dallas, TX",
      body: "Needed a hand wash station during my home renovation. FlushJohn connected me with a local vendor quickly, and the service was professional. The unit was delivered on time and picked up promptly when we were done.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-3.webp`,
        alt: "Christine Barnes testimonial for FlushJohn event portable toilet",
      },
      title: "Christine Barnes - Event Coordinator, Los Angeles, CA",
      body: "Organized a family reunion in LA and needed portable restrooms. FlushJohn made it easy to get quotes and the booking process was smooth. The units were clean and delivered on time. Great experience overall.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-4.webp`,
        alt: "Janet Estremera testimonial for FlushJohn wedding porta potty rental",
      },
      title: "Janet Estremera - Wedding Planner, Miami, FL",
      body: "Used FlushJohn for a wedding event in Miami. They coordinated with a local vendor who delivered luxury restroom trailers. The service was excellent, and the units were perfect for our outdoor wedding venue. Highly recommend for event planners.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-1.webp`,
        alt: "Michael Chen testimonial for FlushJohn construction porta potty rental",
      },
      title: "Michael Chen - Project Manager, Atlanta, GA",
      body: "Managing multiple construction sites across Atlanta, we rely on FlushJohn to connect us with reliable vendors. Their network covers all our locations, and the service has been consistent. The quote process is straightforward, and pricing is transparent.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-2.webp`,
        alt: "Sarah Johnson testimonial for FlushJohn festival porta potty rental",
      },
      title: "Sarah Johnson - Festival Organizer, Chicago, IL",
      body: "Organized a music festival in Chicago and needed multiple units. FlushJohn helped us find a vendor who could handle the volume and timing. The units were well-maintained throughout the event, and the vendor was responsive to our needs.",
    },
  ],
};
