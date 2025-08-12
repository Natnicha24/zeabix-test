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
} from "@mui/material";
import { RefineThemes } from "@refinedev/mui";
import { User } from "../../type/auth";
import React, { useState } from "react";

function createFakeToken(email: string) {
  return btoa(email + ":" + new Date().getTime());
}

function LoginPage() {
  const blueTheme = createTheme(RefineThemes.Blue);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const navigate = useNavigate();

  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (isUser) {
      const token = createFakeToken(email);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("fullName", isUser.fullName);
      sessionStorage.setItem("role", isUser.role);
      setIsOpenAlert(false);
      navigate("/main");
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
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                label="email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsOpenAlert(false);
                }}
              />
              <TextField
                label="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsOpenAlert(false);
                }}
              />
              <Box
                sx={{
                  display: isOpenAlert ? "flex" : "none",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="red"
                  display={isOpenAlert ? "block" : "none"}
                >
                  email or password is wrong
                </Typography>
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
