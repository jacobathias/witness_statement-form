import { Box, Typography } from "@mui/material";
interface ILabelT {
  children:string;
}
export default function LabelT({ children="" }:ILabelT) {
  return (
    <Box marginBottom={0} marginTop={0}>
      <Typography fontWeight={500} variant="subtitle1">
        {children.toUpperCase()}
      </Typography>
    </Box>
  );
}
