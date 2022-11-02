import * as React from "react";
import { useField } from "formik";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import QuoteStep3Styles from "../../styles/QuickQuote.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  "Standard Portable Restroom",
  "Deluxe Flushable Restroom",
  "ADA Portable Restroom",
  "Hand Wash Station",
];

export default function MyMultipleSelectCheckmarks({ ...props }) {
  const [personName, setPersonName] = React.useState([]);
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <FormControl
        size="small"
        placeholder={props.label}
        label={props.label}
        fullWidth
        onChange={(e) => {
          setValue(e);
        }}
        sx={{
          background: "white",
          borderRadius: ".5rem",
          outline: "none",
          border: "none",
        }}
      >
        <Select
          {...props}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {touched && error ? (
        <div className={QuoteStep3Styles.error}>
          {error + " "}
          <span>
            <img style={{ height: "1.5rem" }} src="/assets/error.png" />
          </span>
        </div>
      ) : null}
    </>
  );
}
