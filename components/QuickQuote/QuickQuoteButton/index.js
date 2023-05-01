import * as React from "react";
import { QuickQuoteContext } from "../../../contexts/QuickQuoteContext";
import styles from "./styles.module.css";
import PhoneIcon from "@mui/icons-material/Phone";
import { phone } from "../../../constants";

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
      <a
        href={phone_link}
        onClick={() => {
          setQuickQuoteViewStatus(!quickQuoteViewStatus);
        }}
        className={styles.phoneBtn}
      >
        <PhoneIcon className={styles.icon} />
      </a>
    </div>
  );
}
