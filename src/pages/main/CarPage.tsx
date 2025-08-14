import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AddDispatch, RootState } from "../../store/store";
import { ReactNodeArray, useEffect, useState } from "react";
import { fetchCars } from "../../slice/carSlice";
import { useNavigate } from "react-router";
import CarModal from "../../components/card/CarModal";

function CarPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const sortedCars = [...cars].sort((a, b) => a.model.localeCompare(b.model));

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleAddCar = (e: React.FormEvent) => {
    setIsOpenModal(true);
  };

  const handleClose=()=>[
    setIsOpenModal(false)
  ]

  return (
    <Box paddingX={4}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={2}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          Car Status
        </Typography>
        <Button
          variant="contained"
          sx={{ height: "fit-content" }}
          onClick={handleAddCar}
        >
          Add Car
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0073E6" }}>
              <TableCell sx={{ color: "white" }}>Model</TableCell>
              <TableCell sx={{ color: "white" }}>Plate</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Usage Count
              </TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCars
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((car) => (
                <TableRow key={car.plate}>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell align="center">{car.usageCount}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        car.status === "available"
                          ? "green"
                          : car.status === "booked"
                          ? "red"
                          : "",
                    }}
                  >
                    {car.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={cars.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>

      <Modal open={isOpenModal} onClose={handleClose}>
        <CarModal onclose={handleClose} />
      </Modal>
    </Box>
  );
}

export default CarPage;
