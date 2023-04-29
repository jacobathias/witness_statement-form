import * as React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/system";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface IMyDateSelect {
  label:string;
  name:string;
}


export default function TimeSelect({label, name}:IMyDateSelect) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleTime = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          components={{ OpenPickerIcon: AccessTimeIcon }}
          value={value}
          label={label}
          onChange={handleTime}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} required name={name} value={value}/>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
