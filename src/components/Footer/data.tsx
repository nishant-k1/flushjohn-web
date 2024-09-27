import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PolicyIcon from "@mui/icons-material/Policy";
import GavelIcon from "@mui/icons-material/Gavel";
import ArticleIcon from "@mui/icons-material/Article";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import MessageIcon from "@mui/icons-material/Message";
import { FaBloggerB } from "react-icons/fa";
import EmailIcon from "@mui/icons-material/Email";
import { home_data } from "../../constants";
import { phone } from "../../constants";

const { locations } = home_data;
const { phone_link, phone_number } = phone;

export const footerLinks = {
  social: [
    {
      id: "1",
      name: "Facebook",
      href: "/facebook",
      icon: <FacebookIcon />,
    },
    {
      id: "2",
      name: "Twitter",
      href: "/twitter",
      icon: <TwitterIcon />,
    },
    {
      id: "3",
      name: "Instagram",
      href: "/instagram",
      icon: <InstagramIcon />,
    },
    {
      id: "4",
      name: "LinkedIn",
      href: "/linkedin",
      icon: <LinkedInIcon />,
    },
    {
      id: "5",
      name: "Pinterest",
      href: "/pinterest",
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
      name: "Contact",
      href: "/contact",
      icon: <MessageIcon />,
    },
    {
      id: "9",
      name: "Blog",
      href: "/blog",
      icon: <FaBloggerB style={{ fontSize: "1.5rem" }} />,
    },
    {
      id: "10",
      name: "FAQ",
      href: "/faq",
      icon: <ArticleIcon />,
    },
    {
      id: "11",
      name: "Privacy Policy",
      href: "/privacy",
      icon: <PolicyIcon />,
    },
    {
      id: "12",
      name: "Terms & Conditions",
      href: "/terms",
      icon: <GavelIcon />,
    },
    {
      id: "13",
      name: "Disclaimer",
      href: "/disclaimer",
      icon: <ArticleIcon />,
    },
  ],
  contact: [
    {
      id: "14",
      name: "Phone",
      href: phone_link,
      icon: <PhoneIcon />,
    },
    {
      id: "15",
      name: "Email",
      href: "/contact",
      icon: <EmailIcon />,
    },
    {
      id: "16",
      name: "Get Free Quote",
      href: "/quote",
      icon: <RequestQuoteIcon />,
    },
  ],
};
