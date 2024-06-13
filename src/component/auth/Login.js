import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

import {
  TextField,
  Container,
  Button,
  Typography,
  Card,
  AlertTitle,
  Alert,
  InputAdornment,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginImg from "../../utils/logo.png";

const Login = () => {
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    showAlert: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormData({
        ...formData,
        showAlert: true,
      });
      return;
    }
    dispatch(loginUser(formData));
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  return (
    <>
      <Container
        fixed
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <img src={loginImg} alt="img" style={{ flex: 1, maxWidth: "40%" }} />
        <Card
          sx={{
            padding: 6,
            margin: 10,
            flex: 1,
            maxWidth: "50%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1d5393",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            Girme Technologies PVT LTD.
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h6">Login</Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email address"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              error={formData.email && !isEmailValid()}
              helperText={
                formData.email && !isEmailValid()
                  ? "Invalid email format"
                  : error?.message === "Invalid Email or Password"
              }
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type={formData.showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={formData.password && formData.password.length < 8}
              helperText={
                formData.password && formData.password.length < 8
                  ? "Password must be at least 8 characters"
                  : error?.message === "Invalid Email or Password"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                    >
                      {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formData.showAlert || error?.message ? (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {formData.showAlert
                  ? "Please enter all fields."
                  : error?.message}
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              m={2}
              fullWidth
              sx={{ backgroundColor: "#1d5393", position: "relative" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
