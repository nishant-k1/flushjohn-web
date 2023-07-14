import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import PhoneIcon from "@mui/icons-material/Phone";
import { phone } from "../../../constants";
import Link from "next/link";
import { logEvent } from "../../../react-ga4-config";

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
          logEvent({
            category: "Button",
            action: "Quick Lead Phone Call",
            label: "Quick Lead Phone Call Button",
            value: undefined,
            nonInteraction: undefined,
            transport: "beacon",
          });
        }}
      >
        <PhoneIcon className={styles.icon} />
      </Link>
    </div>
  );
}
