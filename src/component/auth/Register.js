import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";
// import { Link } from "react-router-dom";

import {
  TextField,
  Container,
  Button,
  Typography,
  Card,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    showAlert: false,
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setFormData({
        ...formData,
        showAlert: true,
      });
      return;
    }

    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // role: "user", // You can set the role to a default value here if needed
      })
    );
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">QUALITY ENGINEERING CO.</Typography>
      <Card
        sx={{
          padding: 6,
          margin: 10,
        }}
      >
        <Typography variant="h5">Registration</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formData.name === ""}
            helperText={formData.name === "" ? "Name is required" : ""}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formData.email && !isEmailValid()}
            helperText={
              formData.email && !isEmailValid()
                ? "Invalid email format"
                : error?.message === "Invalid Email or Password"
                ? "Email does not exist"
                : ""
            }
          />
          <TextField
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
                ? "Incorrect password"
                : ""
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
          {error?.message === "User already exists" && (
            <Typography variant="body2" color="error">
              User already exist
            </Typography>
          )}
          {formData.showAlert ? (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              <AlertTitle>Error</AlertTitle>
              Please enter all fields.
            </Alert>
          ) : error?.message === "User already exists" ? (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              <AlertTitle>Error</AlertTitle>
              User already exist
            </Alert>
          ) : (
            ""
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          Don’t have an account?
          {/* Add your registration link here */}
          <Button href="/">Login</Button>
        </Typography>
      </Card>
    </Container>
  );
};

export default Register;
