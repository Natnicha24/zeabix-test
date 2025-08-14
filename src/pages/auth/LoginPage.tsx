import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { RefineThemes } from "@refinedev/mui";
import { User } from "../../type/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginScheme } from "../../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function createFakeToken(email: string) {
  return btoa(email + ":" + new Date().getTime());
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginScheme),
  });

  const blueTheme = createTheme(RefineThemes.Blue);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const navigate = useNavigate();

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const handleLogin = (data: LoginForm) => {
    const isUser = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    console.log(isUser);
    if (isUser) {
      console.log("aa");
      const token = createFakeToken(data.email);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("fullName", isUser.fullName);
      sessionStorage.setItem("role", isUser.role);
      setIsOpenAlert(false);
      navigate("/main");
      return;
    } else {
      setIsOpenAlert(true);
    }
  };

  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
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
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleLogin)}>
              <TextField
                label="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                onFocus={() => setIsOpenAlert(false)}
              />
              <TextField
                label="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Box
                sx={{
                  display: isOpenAlert ? "flex" : "none",
                  justifyContent: "center",
                }}
              >
                {isOpenAlert && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    This email is not registered.
                  </Alert>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Typography variant="body2">Do not have accout yet?</Typography>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={{
                    "&:hover": {
                      color: "#115293",
                      textDecoration: "underline",
                    },
                  }}
                >
                  register
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
