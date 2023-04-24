import { Box, Typography } from "@mui/material";
interface ILabelT {
  children:string;
}
export default function LabelT({ children="" }:ILabelT) {
  return (
    <Box marginBottom={1} marginTop={1}>
      <Typography fontWeight={500} variant="subtitle1">
        {children.toUpperCase()}
      </Typography>
    </Box>
  );
}
