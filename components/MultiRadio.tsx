import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LabelT from "./LabelT";

interface IRadioYesNo {
  label: string;
  onChange?: any;
  defaultValue?: string;
  itens: Array<string>;
}

export default function MultiRadio({
  label,
  onChange,
  defaultValue = "Yes",
  itens = ["MISSING RADIOS"],
}: IRadioYesNo) {
  return (
    <FormControl>
      <LabelT>{label}</LabelT>
      <RadioGroup
        row
        onChange={onChange}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={defaultValue}
        name="radio-buttons-group"
      >
        {itens.map((i: string) => (
          <FormControlLabel value={i} control={<Radio/>} label={i} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
