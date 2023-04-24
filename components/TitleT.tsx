import { Box, Typography } from "@mui/material";

interface ITitleT{
  children: any
}

export default function TitleT({children}:ITitleT) {
  return (
    <Box marginBottom={0} marginTop={4}>
      <Typography variant="h5" component="h5" fontWeight={550}>
        {children}
      </Typography>
    </Box>
  );
}
