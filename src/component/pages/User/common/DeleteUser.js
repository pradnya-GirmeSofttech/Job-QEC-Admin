import React from "react";
import { Modal, Box, Typography, Button as MuiButton } from "@mui/material";

function DeleteUser({ open, onClose, onConfirm }) {
  const handleConfirm = () => {
    // Add your logic for confirming and handling the delete action here
    onConfirm();
    onClose(); // Close the modal
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
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
        <Typography id="delete-modal-title" variant="h6">
          Confirm Deletion
        </Typography>
        <Typography id="delete-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this user?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <MuiButton onClick={onClose} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={handleConfirm} color="error">
            Confirm
          </MuiButton>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteUser;
