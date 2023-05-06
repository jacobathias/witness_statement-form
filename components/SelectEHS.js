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
      name: "Jacob Athias",
      email: "jathias@pgtindustries.com",
    },
    {
      name: "Kristyn Kauffman",
      email: "kkauffman@pgtindustries.com",
    },
    {
      name: "Jon Fitzgerald",
      email: "jfitzgerald@pgtindustries.com",
    },
    {
      name: "Agustin Uribe",
      email: "agustin.uribe@pgtindustries.com",
    },
    {
      name: "Jake Personal",
      email: "jacobathias.stm@gmail.com",
    },
    {
      name: "This email",
      email: "inaciojacobit@gmail.com",
    },
  ];

  return (
    <FormControl sx={{ m: 0, minWidth: 250 }}>
      {" "}
      <InputLabel>Choose EHS agent</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Choose EHS agent"
        fullWidth
      >
        {EHSagents.map((i) => (
          <MenuItem value={i.email} key={i.name}>{i.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
