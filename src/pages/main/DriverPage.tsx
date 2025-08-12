import { useDispatch, useSelector } from "react-redux";
import { AddDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchDrivers } from "../../slice/driverSlice";
import { Box, Stack, Typography } from "@mui/material";
import DriverCard from "../../components/card/DriverCard";
import { useNavigate } from "react-router";

function DriverPage() {
  const dispatch = useDispatch<AddDispatch>();
  const { drivers, loading, error } = useSelector(
    (state: RootState) => state.drivers
  );

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const checkAuth = () => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchDrivers());
    }
  };

  useEffect(() => {
    const checkAuth1 = async () => {
      await checkAuth();
    };
    checkAuth1();
  }, [dispatch]);

  if (loading) return <Typography>Loading</Typography>;
  if (error) return <Typography>Error</Typography>;

  return (
    <Box paddingX={4}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Driver Status
      </Typography>
      <Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          justifyContent={"space-between"}
        >
          {drivers.map((driver) => (
            <DriverCard
              key={driver.fullName}
              fullName={driver.fullName}
              tripsCount={driver.tripsCount}
              status={driver.status}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default DriverPage;
