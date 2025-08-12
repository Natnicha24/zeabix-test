import { Box, Stack, Typography } from "@mui/material";
import { Car } from "../../type/Car";

function CarCard({ model, plate, usageCount, status }: Car) {
  return (
    <Box
      borderRadius={4}
      bgcolor={"#e2e0e0a2"}
      paddingX={2}
      paddingY={3}
      width={{ xs: "100%", md: "45%", lg: "280px" }}
    >
      <Stack
        direction={"row"}
        alignItems={"start"}
        justifyContent={"space-between"}
        gap={4}
      >
        <Box>
          <Typography
            fontSize={15}
            color="#000000"
            fontWeight={"bold"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            gutterBottom
          >
            {model}
          </Typography>
          <Typography
            fontSize={13}
            color="#000000"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {plate}
          </Typography>
            <Typography
            fontSize={13}
            color="#000000"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
           Usage Count -{usageCount}
          </Typography>
        </Box>
        <Box height={'fit-content'}>
          <Typography height={'fit-content'}
            fontSize={15}
            color={
              status === "booked"
                ? "red"
                : status === "working"
                ? "black"
                : "green"
            }
          >
            {status}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default CarCard;
