import * as React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/system";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function TimeSelect() {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={0}>
          <Grid item md={6} marginBottom={2}>
            <TimePicker
              components={{ OpenPickerIcon: AccessTimeIcon }}
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
}
