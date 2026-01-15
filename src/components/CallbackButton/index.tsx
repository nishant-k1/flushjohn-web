"use client";

import React from "react";
import { Phone } from "lucide-react";
import styles from "./styles.module.css";

interface CallbackButtonProps {
  onClick: () => void;
}

const CallbackButton: React.FC<CallbackButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.callbackButton}
      onClick={onClick}
      aria-label="Request a callback"
    >
      <Phone size={20} className={styles.icon} />
      <span className={styles.text}>Give me a callback</span>
    </button>
  );
};

export default CallbackButton;
