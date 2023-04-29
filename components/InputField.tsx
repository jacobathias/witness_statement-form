import { TextField, FormControl } from "@mui/material";
import { BTooltip } from "./BTooltip";

interface IFullTextField {
  tooltip?: string;
  fullWidth?: boolean;
  multiLine?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  labelError?: string;
  numberOfLines?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur? :any
  value? :string
}
export default function InputField({
  tooltip,
  fullWidth = true,
  multiLine = false,
  required = false,
  error = false,
  helperText = "Field is required",
  labelError = "",
  numberOfLines = 3,
  onChange,
  onBlur

}: IFullTextField) {
  return (
    
      <BTooltip title={tooltip ?? ""}>
        <TextField
        
          // id="outlined-basic"
          error={error}
          label={error ? labelError : ""}
          // variant="filled"
          // size="small"
          helperText={error ? helperText : ""}
          fullWidth={fullWidth !== false && fullWidth !== null}
          sx={fullWidth ? {} : { m: 0, minWidth: 400 }}
          multiline={multiLine}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          rows={multiLine ? numberOfLines : 1}
        ></TextField>
      </BTooltip>
    
  );
}
