import { Box, Stack, Typography } from "@mui/material";
import { PieChartProps } from "../../type/dashboard";
import ReactApexChart from "react-apexcharts";

function PieChart({ title, value, fullValue, series, colors }: PieChartProps) {
  return (
    <Box
      id="chart"
      flex={1}
      display={"flex"}
      bgcolor={"#e2e0e0a2"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={3.5}
      py={2}
      gap={1}
      borderRadius={"15px"}
      minHeight={"110px"}
      width={"fit-content"}
      minWidth={"250px"}
    >
      <Stack direction={"column"}>
        <Typography fontSize={14} color="#000000ff">
          {title}
        </Typography>
        <Stack flexDirection={"row"} alignItems={"baseline"} gap={1}>
          <Typography fontSize={24} color="#11142D" fontWeight={700} mt={1}>
            {value}
          </Typography>
          <Typography fontSize={15} color="#4e4e4fc6" fontWeight={700} mt={1}>
            / {fullValue}
          </Typography>
        </Stack>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width={"120px"}
      />
    </Box>
  );
}

export default PieChart;
