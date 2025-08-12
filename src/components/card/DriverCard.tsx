import { Box, Stack, Typography } from "@mui/material";
import { Driver } from "../../type/driver";

function DriverCard({ fullName, tripsCount, status }: Driver) {
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
          <Box width={{xs:'100%',lg:'150px'}}>
            <Typography
              fontSize={15}
              color="#000000"
              fontWeight={"bold"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              gutterBottom
            >
              {fullName}
            </Typography>
          </Box>

          <Typography
            fontSize={13}
            color="#000000"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            Trip Count -{tripsCount}
          </Typography>
        </Box>
        <Box height={"fit-content"}>
          <Typography
            height={"fit-content"}
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

export default DriverCard;
