
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
      title: "Terry Miles",
      body: "The porta potty arrived on time as promised and it was wonderful. They are best porta potty rental service provider.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-2.webp`,
        alt: "Dean Lacey testimonial for FlushJohn hand wash station rental",
      },
      title: "Dean Lacey",
      body: "I had to rent a hand wash station when my house renovation was going on and the only company on which I could rely on was Flush John. They are very quick in responding to your requirements and relatively cheaper in price.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-3.webp`,
        alt: "Christine Barnes testimonial for FlushJohn event portable toilet",
      },
      title: "Christine Barnes",
      body: "Ordered an event portable toilet unit for a family reunion. The portable toilet arrived the next day of my order.",
    },
    {
      image: {
        src: `${s3assets}/images/home-page-images/testimony-img-4.webp`,
        alt: "Janet Estremera testimonial for FlushJohn wedding porta potty rental",
      },
      title: "Janet Estremera",
      body: "Portable toilet was pretty and nice. I had it ordered for a wedding event on a weekend. As promised over the phone, they dropped it off on Friday and picked up on Monday.",
    },
  ],
};
