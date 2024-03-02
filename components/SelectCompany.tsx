import React from "react";
import {
  MenuItem,
  IconButton,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectCompany({ onChange, value }) {
  const [ehs, setCompany] = React.useState('');

  const handleCompany = (event) => {
    setCompany(event.target.value);
  };

  const Companies = [
    {
      company: "PGT",
      location: " Venice Campus"
    },
    {
      company: "Fort Myers",
      location: "Fort Myers"
    },
    {
      company: "PGT",
      location: " Venice Campus"
    },
   
  ];

  return (
    <FormControl sx={{ m: 0, minWidth: 250 }}>
      {" "}
      <InputLabel>Seelct Company</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Send to EHS agent"
        fullWidth
        
      >
        {Companies.map((i) => (
          <MenuItem value={i.company} key={i.location}>{i.location}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
