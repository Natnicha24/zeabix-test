import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DriverForm, driverSchema } from "../../schema/driverSchema";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../../store/store";
import { addDriver } from "../../slice/driverSlice";

interface DriverModalProps {
  onclose: () => void;
}

function DriverModal({ onclose }: DriverModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverForm>({
    resolver: zodResolver(driverSchema),
  });

  const dispatch = useDispatch<AddDispatch>();

  const handleAddDriver = (data: DriverForm) => {
    dispatch(addDriver(data));
    onclose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleAddDriver)}
      sx={{
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Add New Driver
      </Typography>

      <TextField label="Full Name" {...register("fullName")} required />
      <TextField
        label="Trip Count"
        type="number"
        {...register("tripsCount", { valueAsNumber: true })}
        error={!!errors.tripsCount}
        helperText={errors.tripsCount?.message}
        required
      />
      <FormControl required>
        <InputLabel>Status</InputLabel>
        <Select {...register("status")} label="Status">
          <MenuItem value="working">Working</MenuItem>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="booked">Booked</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default DriverModal;
