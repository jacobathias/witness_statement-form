import React from "react";
import {
  MenuItem,
  IconButton,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { IconFlagTR, IconFlagDE, IconFlagUS } from "material-ui-flags";

export default function SelectEHS({ onChange, value }) {
  const [ehs, setEHS] = React.useState('');

  const handleEHs = (event) => {
    setEHS(event.target.value);
  };

  const EHSagents = [
    {
      name: "Kristyn Kauffman - A shift",
      email: "kkauffman@pgtindustries.com",
    },
    {
      name: "Jon Fitzgerald - A Shift",
      email: "jfitzgerald@pgtindustries.com",
    },
    {
      name: "Joshua Bauer - A Shift",
      email: "josh.bauer@pgtinnovations.com",
    },
    {
      name: "Agustin Uribe - B Shift",
      email: "agustin.uribe@pgtindustries.com",
    },
    {
      name: "Jacob Athias - C/D Shift",
      email: "jathias@pgtindustries.com",
    },
    {
      name: "Karen Previti - DOT",
      email: "kpreviti@pgtindustries.com",
    }
  ];

  return (
    <FormControl sx={{ m: 0, minWidth: 250 }}>
      {" "}
      <InputLabel>Choose EHS agent</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Send to EHS agent"
        fullWidth
        
      >
        {EHSagents.map((i) => (
          <MenuItem value={i.email} key={i.name}>{i.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
