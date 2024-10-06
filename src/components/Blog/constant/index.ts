import { s3assets } from "@/constants";

type PostDataType = {
  post_list: PostType[];
  spr: PostType;
  acpr: PostType;
  dfr: PostType;
  hss: PostType;
};

type PostType = {
  id: number;
  date: string;
  image: {
    src: string;
    alt: string;
  };
  keywords: string[];
  title: string;
  desc: string;
};

export const post_data: PostDataType = {
  post_list: [
    {
      id: 1,
      date: "10/08/2024",
      image: {
        src: `${s3assets}/assets/products/sps_blue.svg`,
        alt: "Standard Portable Restroom",
      },
      title: "Standard Portable Restroom",
      desc: "Portable restrooms have become a necessary commodity in various outdoor events, construction sites, and other locations where traditional restrooms are not available. They provide a convenient and hygienic solution for people to use the bathroom while they are away from home.",
      keywords: [
        "portable restroom",
        "outdoor events",
        "construction sites",
        "hygienic solution",
      ],
    },
    {
      id: 2,
      date: "10/09/2024",
      image: {
        src: `${s3assets}/assets/products/ada_blue.svg`,
        alt: "ADA-Compliant Portable Restroom",
      },
      title: "ADA-Compliant Portable Restroom",
      desc: "The Americans with Disabilities Act (ADA) requires that all public events and construction sites provide accessible portable toilets, also known as ADA compliant porta potties, to ensure that people with disabilities have equal access to facilities.",
      keywords: [
        "ADA compliant",
        "accessible toilets",
        "portable toilets",
        "equal access",
      ],
    },
    {
      id: 3,
      date: "10/10/2024",
      image: {
        src: `${s3assets}/assets/products/flushable.svg`,
        alt: "Flushable Restroom-Sink inside",
      },
      title: "Flushable Restroom-Sink inside",
      desc: "A deluxe flushable porta potty is a premium portable toilet that features flushing capability, freshwater supply, and a built-in sink with running water, providing users with a comfortable and convenient restroom experience similar to that of a traditional indoor restroom.",
      keywords: [
        "flushable toilet",
        "premium portable toilet",
        "hygienic restroom",
        "built-in sink",
      ],
    },
    {
      id: 4,
      date: "10/11/2024",
      image: {
        src: `${s3assets}/assets/products/sinkFront.png`,
        alt: "Hand Wash Sink Station",
      },
      title: "Hand Wash Sink Station",
      desc: "A standalone handwash sink is a portable sink unit that is often used in outdoor events and construction sites, providing a convenient and hygienic handwashing solution for users to maintain cleanliness and prevent the spread of germs.",
      keywords: [
        "hand wash station",
        "portable sink",
        "hygienic solution",
        "outdoor events",
      ],
    },
  ],
  spr: {
    id: 1,
    date: "10/08/2024",
    image: {
      src: `${s3assets}/assets/products/sps_blue.svg`,
      alt: "Standard Portable Restroom",
    },
    title: "Standard Portable Restroom",
    desc: "Portable restrooms have become a necessary commodity in various outdoor events, construction sites, and other locations where traditional restrooms are not available. They provide a convenient and hygienic solution for people to use the bathroom while they are away from home. Standard portable restrooms are a popular option due to their affordability and versatility. In this blog post, we will explore the benefits of standard portable restrooms and why they are a great choice for your next event or project. Affordable and Accessible One of the main benefits of standard portable restrooms is their affordability. Compared to other types of portable restrooms, they are the most cost-effective option. They are also widely available, making it easy to rent them for your event or project. With standard portable restrooms, you can provide your guests or workers with a comfortable and clean restroom experience without breaking the bank. Standard portable restrooms are versatile and can be used in a wide range of settings. They are ideal for outdoor events, such as weddings, concerts, and festivals, as well as construction sites, parks, and other public spaces. They can be easily moved from one location to another, making them a convenient choice for projects that require frequent relocation. Standard portable restrooms are designed with hygiene in mind. They are equipped with features that promote cleanliness and reduce the risk of the spread of germs. These features include hand sanitizer dispensers, ventilation systems, and waste containment tanks. With these features, standard portable restrooms provide a safe and hygienic restroom experience for users. Standard portable restrooms provide users with a sense of privacy that is not always available with traditional restroom facilities. They are designed to ensure that users can use the bathroom without feeling exposed or vulnerable. They come equipped with locking doors and other features that ensure privacy and security. Standard portable restrooms are a practical and affordable option for providing restroom facilities in outdoor events, construction sites, and other locations. They are versatile, hygienic, and provide users with a sense of privacy. If you are looking for a portable restroom solution for your next project or event, consider renting standard portable restrooms. With their affordability and convenience, they are an excellent choice for your needs.",
    keywords: [
      "portable restroom",
      "affordable option",
      "hygiene",
      "versatile",
    ],
  },
  acpr: {
    id: 2,
    date: "10/09/2024",
    image: {
      src: `${s3assets}/assets/products/ada_blue.svg`,
      alt: "ADA-Compliant Portable Restroom",
    },
    title: "ADA-Compliant Portable Restroom",
    desc: "The Americans with Disabilities Act (ADA) is a comprehensive civil rights law that prohibits discrimination against people with disabilities. It was signed into law in 1990 and has since been amended to further strengthen its protections. In this blog post, we will explore the importance of the ADA, its key provisions, and how it benefits people with disabilities. The ADA is an essential law that has helped to ensure that people with disabilities have equal access to employment, public accommodations, transportation, and other essential services. Prior to the ADA, people with disabilities faced discrimination and barriers that prevented them from fully participating in society. The ADA has helped to break down those barriers and create a more inclusive and accessible society for all. Key Provisions of the ADA Title I of the ADA prohibits employment discrimination against people with disabilities. This includes discrimination in hiring, promotion, and job training. Title II of the ADA prohibits discrimination by state and local governments in the provision of public services and programs. This includes access to public transportation, public accommodations, and communication services. Title III of the ADA prohibits discrimination by private businesses that are open to the public. This includes restaurants, hotels, retail stores, and other public accommodations. disabilities. Title V of the ADA includes miscellaneous provisions, such as prohibiting retaliation against individuals who exercise their rights under the law. The ADA has had a significant impact on the lives of people with disabilities. It has helped to ensure that people with disabilities have access to employment, transportation, and other essential services. It has also helped to break down the physical and social barriers that prevent people with disabilities from fully participating in society. For example, the ADA has helped to ensure that public buildings, transportation systems, and public accommodations are accessible to people with disabilities. This has allowed people with disabilities to participate more fully in their communities, attend events, and enjoy recreational activities. The ADA has also helped to raise awareness of the needs and capabilities of people with disabilities. This has helped to reduce stigma and increase understanding, which has led to greater acceptance and inclusion. The Americans with Disabilities Act is an essential law that has helped to ensure that people with disabilities have equal access to employment, public accommodations, transportation, and other essential services. Its provisions have helped to break down barriers and create a more inclusive and accessible society for all. The ADA has had a significant impact on the lives of people with disabilities and has helped to promote greater understanding and acceptance of their needs and capabilities.",
    keywords: [
      "Americans with Disabilities Act",
      "civil rights law",
      "equal access",
      "discrimination",
    ],
  },
  dfr: {
    id: 3,
    date: "10/10/2024",
    image: {
      src: `${s3assets}/assets/products/flushable.svg`,
      alt: "Flushable Restroom-Sink inside",
    },
    title: "Flushable Restroom-Sink inside",
    desc: "Deluxe flushable portable restrooms are a popular option for outdoor events, construction sites, and other locations where traditional restrooms are not available. They provide a high-quality restroom experience that is similar to what people would expect from a traditional indoor restroom. In this blog post, we will explore the benefits of deluxe flushable portable restrooms and why they are a great choice for your next event or project. One of the main benefits of deluxe flushable portable restrooms is their convenience. They come equipped with a flushing toilet and a handwashing station, just like a traditional indoor restroom. This allows users to have a comfortable and hygienic restroom experience that is similar to what they would expect at home or in an office building. The flushing mechanism also allows for efficient waste removal, ensuring a clean and odor-free environment. Deluxe flushable portable restrooms are designed with comfort in mind. They come equipped with features that provide a luxurious experience for users, such as air conditioning, heating, and interior lighting. They also offer more space than standard portable restrooms, allowing users to move around more freely and comfortably. Deluxe flushable portable restrooms are designed with hygiene in mind. They are equipped with features that promote cleanliness and reduce the risk of the spread of germs. These features include a handwashing station with soap and water, a foot-operated flushing mechanism, and a waste containment tank that is sealed to prevent odors and leaks. Deluxe flushable portable restrooms provide users with a sense of privacy that is not always available with traditional restroom facilities. They are designed to ensure that users can use the bathroom without feeling exposed or vulnerable. They come equipped with locking doors and other features that ensure privacy and security. In conclusion, deluxe flushable portable restrooms are an excellent choice for outdoor events, construction sites, and other locations where traditional restrooms are not available. They provide a high-quality restroom experience that is similar to what people would expect from a traditional indoor restroom. With their convenience, comfort, and hygiene features, deluxe flushable portable restrooms are a popular option that will make your next event or project a success.",
    keywords: [
      "deluxe portable restrooms",
      "flushable toilets",
      "convenience",
      "hygiene",
    ],
  },
  hss: {
    id: 4,
    date: "10/11/2024",
    image: {
      src: `${s3assets}/assets/products/sinkFront.png`,
      alt: "Hand Wash Sink Station",
    },
    title: "Hand Wash Sink Station",
    desc: "Hand wash stations are essential for maintaining hygiene and cleanliness at outdoor events, construction sites, and other locations where traditional restrooms are not available. They provide users with a convenient and hygienic way to wash their hands and prevent the spread of germs. In this blog post, we will explore the benefits of hand wash stations and why they are a great addition to any portable restroom setup. One of the main benefits of hand wash stations is their convenience. They provide users with a dedicated space to wash their hands after using the restroom or handling food. This is especially important in outdoor settings where access to running water may be limited. Hand wash stations are equipped with a sink, soap dispenser, and paper towel dispenser, making it easy for users to maintain cleanliness. Hand wash stations are also designed with hygiene in mind. They are often equipped with features that promote cleanliness and reduce the risk of the spread of germs. For example, many hand wash stations come with foot-operated pumps for dispensing soap and water, minimizing contact with surfaces and reducing the risk of cross-contamination. Additionally, hand wash stations can be set up in close proximity to portable restrooms, encouraging users to wash their hands after using the facilities. Hand wash stations also provide a sense of safety and comfort for users. They offer a dedicated space for personal hygiene, which can help to alleviate concerns about cleanliness in outdoor settings. This is especially important for events that serve food or drinks, where maintaining proper hygiene is crucial for preventing foodborne illnesses. In conclusion, hand wash stations are an essential addition to any portable restroom setup. They provide users with a convenient and hygienic way to wash their hands, promoting cleanliness and preventing the spread of germs. Whether for outdoor events, construction sites, or other locations, hand wash stations are a must-have for ensuring a safe and enjoyable experience for all users.",
    keywords: ["hand wash station", "hygiene", "outdoor events", "convenience"],
  },
};
