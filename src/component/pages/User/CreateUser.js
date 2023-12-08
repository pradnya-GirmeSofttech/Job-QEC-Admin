import React, { useState, useEffect } from "react";
import Dashboard from "../../dashboard/Dashboard";
import CustomBreadcrumb from "../../../common/CustomBreadcrumb";
import { handleSelection } from "../../../utils/HandleBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Container,
  Button,
  Typography,
  Card,
  AlertTitle,
  Alert,
  Box,
  Modal,
  IconButton,
} from "@mui/material";
import { addNewUser } from "../../../actions/user";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { clearUserError } from "../../../slice/authSlice";
function CreateUser() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [formDataError, setFormDataError] = useState({
    name: false,
    email: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // showAlert: false,
  });
  const dispatch = useDispatch();
  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      const isValidEmail = isEmailValid();
      setFormDataError((prevErrors) => ({
        ...prevErrors,
        email: !isValidEmail,
      }));
    } else if (formDataError[name]) {
      setFormDataError((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = ["name", "email"];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setFormDataError(newErrors);

      return;
    }
    //  if (!error && !error?.message) {
    //    setSuccessMessage(true);
    //    setOpen(true);
    //  } else {
    //    setOpen(false);
    //    setSuccessMessage(false);
    //  }
    if (error?.message === "User already exists") {
      setSuccessMessage(true);
      setOpen(true);
    } else {
      setSuccessMessage(false);
      setOpen(false);
    }

    if (error?.message === "User already exists") {
      newErrors.email = true;
    }
    dispatch(addNewUser(formData));
  };
  useEffect(() => {
    if (error) {
      // If there is an error, setOpen(false) to close the modal
      setOpen(false);
    } else {
      // If there is no error, setOpen(true) to open the modal
      setOpen(true);
    }
  }, [error]);
  const handleClick = (event, name) => {
    const newSelected = handleSelection(selected, name);
    setSelected(newSelected);
  };
  const handleClose = () => {
    setOpen(false);
    // Dispatch the clearUserError action when closing the modal or as needed
    dispatch(clearUserError());
  };
  return (
    <Dashboard>
      <CustomBreadcrumb
        items={["User", "User/Create-user"]}
        onClick={handleClick}
      />
      {successMessage && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              aria-label="close"
              color="inherit"
              edge="end"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 0,
                right: 5,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              User added successfully
            </Typography>
            <Button onClick={() => navigate(-1)} variant="contained">
              Ok
            </Button>
          </Box>
        </Modal>
      )}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            padding: 6,
            margin: 10,
          }}
        >
          <Typography variant="h6">Add new user</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formDataError.name} // Set error prop based on the error state
              helperText={formDataError.name ? "This field is required" : ""}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onBlur={handleChange}
              onChange={handleChange}
              error={formDataError.email} // Set error prop based on the error state
              helperText={
                formDataError.email && !isEmailValid()
                  ? "Invalid email format"
                  : error?.message === "Invalid Email or Password"
                  ? "Email does not exist"
                  : ""
              }
              // helperText={
              //   !formData.email && !isEmailValid()
              //     ? "Invalid email format"
              //     : error?.message === "Invalid Email or Password"
              //     ? "Email does not exist"
              //     : ""
              // }
            />

            {error?.message === "User already exists" ? (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                <AlertTitle>Error</AlertTitle>
                User already exists
              </Alert>
            ) : null}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register User
            </Button>
          </form>
        </Card>
      </Container>
    </Dashboard>
  );
}

export default CreateUser;
