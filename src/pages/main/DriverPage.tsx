import { useDispatch, useSelector } from "react-redux";
import { AddDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchDrivers } from "../../slice/driverSlice";
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
import { useNavigate } from "react-router";
import DriverModal from "../../components/card/DriverModal";

function DriverPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const sortedDriver = [...drivers].sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  if (loading) return <Typography>Loading</Typography>;
  if (error) return <Typography>Error</Typography>;

  return (
    <Box paddingX={4}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Driver Status
        </Typography>
        <Button variant="contained" sx={{height:'fit-content'}} onClick={()=>setIsOpenModal(true)}>
          Add Driver
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0073E6" }}>
              <TableCell sx={{ color: "white" }}>Fullname</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Trip Count
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDriver
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((driver, index) => (
                <TableRow key={driver.fullName + index}>
                  <TableCell>{driver.fullName}</TableCell>
                  <TableCell align="center">{driver.tripsCount}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        driver.status === "available"
                          ? "green"
                          : driver.status === "booked"
                          ? "red"
                          : "",
                    }}
                  >
                    {driver.status}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component={"div"}
          count={drivers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>

      <Modal open={isOpenModal} onClose={handleClose}>
        <DriverModal onclose={handleClose} />
      </Modal>
    </Box>
  );
}

export default DriverPage;
