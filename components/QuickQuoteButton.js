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
        left: -68,
        top: "50vh",
        fontSize: "14px",
        transform: "rotate(90deg)",
      }}
    >
      Quick Free Quote
    </Button>
  );
}
