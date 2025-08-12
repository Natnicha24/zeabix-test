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

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [role, setRole] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenAlertPassword, setIsOpenAlertPassword] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: RegisterData = {
      fullName,
      email,
      password,
      cfPassword,
      role,
    };
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const isDuplicate = users.some((user) => user.email === newUser.email);

    const isPasswordMatch = newUser.password === newUser.cfPassword;

    if (!isPasswordMatch) {
      setIsOpenAlertPassword(true);
    } else {
      if (isDuplicate) {
        setIsOpenAlert(true);
      } else {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setIsOpenAlert(false);
        setPopUp(true);
        setTimeout(() => {
          setPopUp(false);
          navigate("/login");
        }, 3000);
      }
    }
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
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="full name"
              margin="normal"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              label="email"
              margin="normal"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsOpenAlert(false);
              }}
            />
            <TextField
              label="password"
              margin="normal"
              fullWidth
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsOpenAlertPassword(false);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isOpenAlertPassword ? "red" : "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: isOpenAlertPassword ? "darkred" : "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isOpenAlertPassword ? "red" : "blue",
                  },
                },
              }}
            />
            <TextField
              label="comfirm password"
              margin="normal"
              fullWidth
              type="password"
              required
              value={cfPassword}
              onChange={(e) => {
                setCfPassword(e.target.value);
                setIsOpenAlertPassword(false);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: isOpenAlertPassword ? "red" : "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: isOpenAlertPassword ? "darkred" : "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isOpenAlertPassword ? "red" : "blue",
                  },
                },
              }}
            />
            <Typography
              variant="caption"
              color="red"
              display={isOpenAlertPassword ? "block" : "none"}
            >
              password and confirm password is not match
            </Typography>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
