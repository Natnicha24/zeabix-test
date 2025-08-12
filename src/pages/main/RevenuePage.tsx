import { Box, Typography, Stack } from "@mui/material";
import RevenueChart from "../../components/chart/RevenueChart";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function RevenuePage() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <Box
      px={4}
      flex={1}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"15px"}
    >
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Total Revenue
      </Typography>
      <RevenueChart />
    </Box>
  );
}

export default RevenuePage;
