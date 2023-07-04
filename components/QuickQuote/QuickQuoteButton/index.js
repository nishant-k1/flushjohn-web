import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import PhoneIcon from "@mui/icons-material/Phone";
import { phone } from "../../../constants";
import Link from "next/link";
import { gtag } from "../../../google-gtag";

export default function QuickQuoteButton() {
  const { phone_link, phone_number } = phone;
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);

  return (
    <div>
      <button
        onClick={() => {
          setQuickQuoteViewStatus(!quickQuoteViewStatus);
        }}
        className={styles.quickQuoteBtn}
      >
        Quick Quote
      </button>
      <Link
        href={phone_link}
        className={styles.phoneBtn}
        onClick={() => {
          gtag("event", "button_click", {
            event_category: "Button",
            event_label: "Quick Phone Button Clicked",
          });
        }}
      >
        <PhoneIcon className={styles.icon} />
      </Link>
    </div>
  );
}
