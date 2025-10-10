const s3assets = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL as string;

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
      desc: "A great choice for weddings, festivals, and event porta potty rental. A standard porta potty is a portable toilet that is perfect for outdoor events and construction sites, providing basic amenities and convenience for users.",
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
      desc: "A great choice for weddings, festivals, and event porta potty rental. A flushable portable restroom is a modern solution for outdoor events and job sites, providing the comfort of a regular bathroom with the convenience of portability.",
      keywords:
        "flushable restroom, portable sink, restroom-sink combo, outdoor bathroom, event restroom",
    },
    {
      id: 4,
      image: {
        src_1: `${s3assets}/assets/products/sinkFront.png`,
        src_2: `${s3assets}/assets/products/sink3Croppedremovebg.png`,
        alt: "Hand Wash Stations",
      },
      title: "Hand Wash Stations",
      desc: "Pair these with your porta john rental for a complete sanitation setup. Handwash stations provide a convenient and hygienic way for users to wash their hands. These units are often placed alongside porta potties to enhance the sanitation experience.",
      keywords:
        "hand wash station, hygiene, portable sink, sanitation, outdoor handwashing",
    },
  ],
};

