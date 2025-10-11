"use client";

import * as React from "react";
import LoadingButton from "@/components/UI/LoadingButton";
import { SendIcon } from "@/components/UI/Icons";

export default function MyLoadingButton({ ...props }) {
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <LoadingButton
      {...props}
      onClick={handleClick}
      endIcon={<SendIcon size={18} />}
      loading={loading}
      loadingPosition="end"
    >
      Send
    </LoadingButton>
  );
}
