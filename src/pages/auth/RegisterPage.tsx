import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RegisterData, User } from "../../type/auth";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { RegisterForm, registerSchema } from "../../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenAlertPassword, setIsOpenAlertPassword] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (data: RegisterForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const isDuplicate = users.some((user) => user.email === data.email);

    if (isDuplicate) {
      setIsOpenAlert(true);
      return;
    }

    const newUser: RegisterData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      cfPassword: data.cfPassword,
      role: data.role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setIsOpenAlert(false);
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#0073E6",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <TextField
              label="full name"
              margin="normal"
              fullWidth
              required
              {...register("fullName")}
            />
            <TextField
              label="email"
              margin="normal"
              fullWidth
              required
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              onFocus={() => setIsOpenAlert(false)}
            />
            <TextField
              label="password"
              margin="normal"
              fullWidth
              type="password"
              required
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              onFocus={() => setIsOpenAlertPassword(false)}
            />
            <TextField
              label="comfirm password"
              margin="normal"
              fullWidth
              type="password"
              required
              {...register("cfPassword")}
              error={!!errors.cfPassword}
              helperText={errors.cfPassword?.message}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="role"
                {...register("role")}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: isOpenAlert ? "flex" : "none",
                justifyContent: "center",
              }}
            >
              {isOpenAlert && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  This email is already registered.
                </Alert>
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}
            >
              <Typography variant="body2">already have account?</Typography>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{
                  "&:hover": {
                    color: "#115293",
                    textDecoration: "underline",
                  },
                }}
              >
                login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Modal open={popUp}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CircularProgress />
          <Typography mt={2}>
            register success. We'll bring you to Login Page
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default RegisterPage;
