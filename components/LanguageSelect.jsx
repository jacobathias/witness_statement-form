import React from "react";
import { MenuItem, IconButton, FormControl, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { IconFlagTR, IconFlagDE, IconFlagUS } from "material-ui-flags";

export default function LanguageSelect({ onChange, value }) {
  const [language, setLanguage] = React.useState("en");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel>
        Select Language
      </InputLabel>

      <Select value={value} onChange={onChange} label="Select Language">
        <MenuItem value="en" key={'en'} >
          <img src="https://img.icons8.com/color/48/null/usa-circular.png" />
          English
        </MenuItem>

        <MenuItem value="es" key={'es'}>
          {" "}
          <img src="https://img.icons8.com/color/48/null/spain2-circular.png" />Spanish
        </MenuItem>
        <MenuItem value="ht" key={'ht'}>
          <img src="https://img.icons8.com/color/48/null/the-republic-of-haiti-circular.png" />Haitian Creole
        </MenuItem>
      </Select>
    </FormControl>
  );
}
