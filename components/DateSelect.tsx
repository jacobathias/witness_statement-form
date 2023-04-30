import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import LabelT from "./LabelT";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface IMyDateSelect {
  label: string;
}

export default function MyDateSelect({ label }: IMyDateSelect) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue: any) => {setValue(newValue);};
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
