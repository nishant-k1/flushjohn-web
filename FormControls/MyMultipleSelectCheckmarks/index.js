import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
    <div>
      <FormControl fullWidth>
        <InputLabel
          style={{
            color: "black",
            fontWeight: 100,
            fontSize: "medium",
            fontFamily: "Times New Roman",
          }}
        >
          {props.label}
        </InputLabel>
        <Select
          {...props}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          fullWidth
          sx={{
            background: "white",
            borderRadius: ".5rem",
            outline: "none",
            border: "none",
          }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
