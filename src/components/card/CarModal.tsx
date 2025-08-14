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
import { CarForm, carSchema } from "../../schema/carSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AddDispatch } from "../../store/store";
import { addCar } from "../../slice/carSlice";

interface CarModalProps{
    onclose:()=>void
}

function CarModal({onclose}:CarModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
  });

  const dispatch = useDispatch<AddDispatch>();

  const handleAddCar = (data:CarForm) => {
    dispatch(addCar(data))
    onclose()
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleAddCar)}
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
        Add New Car
      </Typography>

      <TextField label="Model" {...register("model")} required />
      <TextField
        label="Plate"
        {...register("plate")}
        error={!!errors.plate}
        helperText={errors.plate?.message}
        required
      />
      <TextField
        label="Usage Count"
        type="number"
        {...register("usageCount", { valueAsNumber: true })}
        error={!!errors.usageCount}
        helperText={errors.usageCount?.message}
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

export default CarModal;
