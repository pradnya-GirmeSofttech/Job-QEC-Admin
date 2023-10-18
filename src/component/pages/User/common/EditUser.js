import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../actions/user";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button as MuiButton,
} from "@mui/material";

function EditUser({ user, isOpen, onClose, handleEdit }) {
  const dispatch = useDispatch();
  const id = user;
  const users = useSelector((state) => state.user.users);
  const editedUser = users?.filter((item) => {
    return item._id === id;
  });

  const [formData, setFormData] = useState({
    name: id ? editedUser[0]?.name : "",
    email: id ? editedUser[0]?.email : "",
    role: id ? editedUser[0]?.role : "",
  });

  const handleSave = (e) => {
    e.preventDefault();

    const editFormData = {
      formData,
      id,
    };

    dispatch(updateUser(editFormData)); // Dispatch an action to update the user
    onClose();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="edit-modal-title" variant="h6">
          Edit User
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={formData?.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Add other user details fields */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <MuiButton onClick={onClose} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleSave} color="primary">
            Save
          </MuiButton>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditUser;
