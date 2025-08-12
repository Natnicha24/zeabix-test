import { Box, Stack, Typography } from "@mui/material";

interface ProgressBarProps{
  title:string,
  percentage:number,
  color:string
}


function ProgressBar({title,percentage,color}:ProgressBarProps) {
  return (
    <Box width={"100%"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16} fontWeight={500} color="#000000ff">
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight={500} color="#11142D">
          {percentage}%
        </Typography>
      </Stack>
      <Box
        mt={2}
        position={"relative"}
        width={"100%"}
        height={"8px"}
        borderRadius={1}
        bgcolor={"#ffffffff"}
      >
        <Box
          position={"absolute"}
          width={`${percentage}%`}
          height={"100%"}
          borderRadius={1}
          bgcolor={color}
        ></Box>
      </Box>
    </Box>
  );
}

export default ProgressBar;
