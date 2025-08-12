import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchCars } from "../../slice/carSlice";
import CarCard from "../../components/card/CarCard";
import { useNavigate } from "react-router";

function CarPage() {
  const dispatch = useDispatch<AddDispatch>();
  const { cars, loading, error } = useSelector(
    (state: RootState) => state.cars
  );

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const checkAuth = () => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchCars());
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
        Car Status
      </Typography>
      <Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          justifyContent={"space-between"}
        >
          {cars.map((car) => (
            <CarCard
              key={car.plate}
              model={car.model}
              plate={car.plate}
              usageCount={car.usageCount}
              status={car.status}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default CarPage;
