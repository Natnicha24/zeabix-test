import PieChart from "../../components/chart/PieChart";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CustomerContactChanel } from "../../components/chart/chart.config";
import ProgressBar from "../../components/chart/ProgressBar";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function DashboardPage() {
  const fullName = JSON.stringify(
    sessionStorage.getItem("fullName") || ""
  ).replace(/^"|"$/g, "");
  const role = JSON.stringify(sessionStorage.getItem("role") || "").replace(
    /^"|"$/g,
    ""
  );

  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <Box minWidth={"xs"} paddingX={5}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ mt: 2, mb: 5 }}
      >
        Hello, {role} {fullName} welcome to summary DashBoard
      </Typography>

      <Stack
        flexDirection={"row"}
        gap={5}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        marginTop={3}
      >
        <Box
          display={"flex"}
          flexDirection={{ xs: "row", xl: "column" }}
          gap={3}
          paddingX={4}
          width={"fit-content"}
          flexWrap={"wrap"}
        >
          <PieChart
            title="Rental Car"
            value={250}
            fullValue={400}
            series={[60, 40]}
            colors={["#275BE8", "#C4E8EF"]}
          />
          <PieChart
            title="Driver"
            value={20}
            fullValue={100}
            series={[20, 80]}
            colors={["#275BE8", "#C4E8EF"]}
          />
          <PieChart
            title="Complete"
            value={270}
            fullValue={270}
            series={[100, 0]}
            colors={["#275BE8", "#C4E8EF"]}
          />
        </Box>
        <Box width={{ xs: "100%", xl: "65%" }} paddingX={4}>
          <Box sx={{ py: 4, px: 4, bgcolor: "#e2e0e0a2", borderRadius: 5 }}>
            <Typography variant="h5" color="#000000ff">
              Customer Contact Chanel
            </Typography>
            <Stack gap={2} sx={{ mt: 3 }}>
              {CustomerContactChanel.map((chanel) => {
                return <ProgressBar key={chanel.title} {...chanel} />;
              })}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default DashboardPage;
