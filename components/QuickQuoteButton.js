import * as React from "react";
import Button from "@mui/material/Button";
import { QuickQuoteContext } from "../contexts/QuickQuoteContext";

export default function QuickQuoteButton() {
  const { quickQuoteViewStatus, setQuickQuoteViewStatus } =
    React.useContext(QuickQuoteContext);
  return (
    <Button
      variant="contained"
      size="small"
      onClick={() => {
        setQuickQuoteViewStatus(!quickQuoteViewStatus);
      }}
      sx={{
        position: "fixed",
        left: -62,
        top: "50vh",
        transform: "rotate(90deg)",
        background: "#0F1B80",
        "&:hover": {
          background: "#0F1B80",
          borderColor: "#0F1B80",
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          background: "#0F1B80",
          borderColor: "#0F1B80",
        },
      }}
    >
      Quick Free Quote
    </Button>
  );
}
