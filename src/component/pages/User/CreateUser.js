import React, { useState } from "react";
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
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import { addNewUser } from "../../../actions/user";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);
  console.log(error);
  const role = useSelector((state) => state.auth.user.role);
  // const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formDataError, setFormDataError] = useState({
    name: false,
    email: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    if (!isEmailValid()) {
      newErrors["email"] = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setFormDataError(newErrors);
      return;
    }

    dispatch(addNewUser(formData))
      .then(() => {
        setSuccessMessage(true);
        setOpenModal(true);
        setFormData({
          name: "",
          email: "",
        });
      })
      .catch((err) => {
        setError(err);
        setOpenModal(true);
        setSuccessMessage(false);
      });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    if (successMessage) {
      navigate(-1);
    }
  };
  const handleClick = (event, name) => {
    const newSelected = handleSelection(selected, name);
    setSelected(newSelected);
  };

  return (
    <Dashboard>
      <CustomBreadcrumb
        items={["User", "User/Create-user"]}
        onClick={handleClick}
      />

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
              error={formDataError.name}
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
              error={formDataError.email}
              helperText={
                formDataError.email && !isEmailValid()
                  ? "Invalid email format"
                  : error?.message === "Invalid Email or Password"
                  ? "Email does not exist"
                  : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              // disabled={/* Add a condition to disable the button during submission */}
            >
              Register User
            </Button>
          </form>
        </Card>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6">
                {error ? "Error" : successMessage ? "Success" : ""}
              </Typography>
              <Typography>
                {error
                  ? formData.showAlert
                    ? "Please enter all fields."
                    : error?.message
                  : successMessage
                  ? "User added successfully"
                  : ""}
              </Typography>
              <Button
                onClick={handleModalClose}
                color="primary"
                variant="contained"
              >
                OK
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Dashboard>
  );
}

export default CreateUser;
