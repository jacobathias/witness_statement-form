import { TextField} from "@mui/material";
import { BTooltip } from "./BTooltip";

interface IFullTextField {
  tooltip?: string;
  fullWidth?: boolean;
  multiLine?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  labelError?:string

}
export default function InputField({
  tooltip,
  fullWidth = true,
  multiLine = false,
  required = false,
  error = false,
  helperText = 'Field is required',
  labelError = ''
  
}: IFullTextField) {
  return (
    <BTooltip title={tooltip ?? ""}>
      <TextField
        // id="outlined-basic"
        error = {error}
        label={error ? (labelError):('')}
        // variant="filled"
        // size="small"
        helperText = {error ? (helperText):('')}
        
        fullWidth={fullWidth !== false && fullWidth !== null}
        sx={fullWidth ? {} : { m: 0, minWidth: 400 }}
        multiline={multiLine}
        required={required}
        rows={multiLine ? 3 : 1}
      ></TextField>
    </BTooltip>
  );
}
