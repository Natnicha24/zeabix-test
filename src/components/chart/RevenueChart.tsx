import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

function RevenueChart() {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={"#fcfcfc"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"15px"}
    >
      <Stack my={"20px"} direction={"row"} gap={4} flexWrap={"wrap"}>
        <Typography fontSize={28} color="#11142D" fontWeight={700}>
          ฿254,789
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#475BE8" }} />
          <Stack>
            <Typography fontSize={15} color="#475BE8">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
}

export default RevenueChart;
