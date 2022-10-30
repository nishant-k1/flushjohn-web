import React from "react";
import { Input } from "antd";

const MyTextFieldAntd = ({ ...props }) => {
  return (
    <>
      <label
        style={{
          color: "black",
          fontWeight: 100,
          fontSize: "medium",
          fontFamily: "Times New Roman",
        }}
      >
        {props.label}
      </label>
      <Input placeholder="Basic usage" />
    </>
  );
};

export default MyTextFieldAntd;
