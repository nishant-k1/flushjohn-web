import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Social = () => {
  return (
    <div>
      <ul className={headerStyles.nav}>
        <li>
          <Link href="https://www.facebook.com/portarental">
            <FacebookIcon className={headerStyles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/reliableportable">
            <TwitterIcon className={headerStyles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/rent_a_porta/">
            <InstagramIcon className={headerStyles.icon} />
          </Link>
        </li>
        <li>
          <Link href="linkedin.com/company/rent-a-porta">
            <LinkedInIcon className={headerStyles.icon} />
          </Link>
        </li>
        <li>
          <Link href="https://www.pinterest.com/renta_porta">
            <PinterestIcon className={headerStyles.icon} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Social;
