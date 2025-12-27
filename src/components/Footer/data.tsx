import {
  HomeIcon,
  PhoneIcon,
  RequestQuoteIcon,
  LocalShippingIcon,
  PolicyIcon,
  GavelIcon,
  ArticleIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  PinterestIcon,
  MessageIcon,
  EmailIcon,
} from "@/components/UI/Icons";
import { FaBloggerB } from "react-icons/fa";
import { phone } from "../../constants";
import { Images as ImagesIcon } from "lucide-react";

const { phone_link } = phone;

export const footerLinks = {
  social: [
    {
      id: "1",
      name: "Facebook",
      href: "https://www.facebook.com/flushjohn",
      icon: <FacebookIcon />,
    },
    {
      id: "2",
      name: "Twitter",
      href: "https://www.twitter.com/flushjohn",
      icon: <TwitterIcon />,
    },
    {
      id: "3",
      name: "Instagram",
      href: "https://www.instagram.com/flushjohn",
      icon: <InstagramIcon />,
    },
    {
      id: "4",
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/flushjohn",
      icon: <LinkedInIcon />,
    },
    {
      id: "5",
      name: "Pinterest",
      href: "https://www.pinterest.com/flushjohn",
      icon: <PinterestIcon />,
    },
  ],
  nav: [
    {
      id: "6",
      name: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      id: "7",
      name: "Rental Products",
      href: "/rental-products",
      icon: <LocalShippingIcon />,
    },
    {
      id: "8",
      name: "Gallery",
      href: "/gallery",
      icon: <ImagesIcon />,
    },
    {
      id: "8.5",
      name: "Service Areas",
      href: "/service-areas",
      icon: <LocalShippingIcon />,
    },
    {
      id: "9",
      name: "Contact",
      href: "/contact",
      icon: <MessageIcon />,
    },
    {
      id: "10",
      name: "Blog",
      href: "/blog",
      icon: <FaBloggerB style={{ fontSize: "1.5rem" }} />,
    },
    {
      id: "10.5",
      name: "About Us",
      href: "/about",
      icon: <ArticleIcon />,
    },
    {
      id: "10.6",
      name: "How It Works",
      href: "/how-it-works",
      icon: <ArticleIcon />,
    },
    {
      id: "11",
      name: "FAQ",
      href: "/faq",
      icon: <ArticleIcon />,
    },
    {
      id: "12",
      name: "Privacy Policy",
      href: "/privacy",
      icon: <PolicyIcon />,
    },
    {
      id: "13",
      name: "Terms & Conditions",
      href: "/terms",
      icon: <GavelIcon />,
    },
    {
      id: "14",
      name: "Disclaimer",
      href: "/disclaimer",
      icon: <ArticleIcon />,
    },
  ],
  contact: [
    {
      id: "15",
      name: "Phone",
      href: phone_link,
      icon: <PhoneIcon />,
    },
    {
      id: "16",
      name: "Email",
      href: "/contact",
      icon: <EmailIcon />,
    },
    {
      id: "17",
      name: "Request Quote",
      href: "/quote",
      icon: <RequestQuoteIcon />,
    },
  ],
};
