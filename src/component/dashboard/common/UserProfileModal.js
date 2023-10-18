import React from "react";
import { Modal, Typography, Button, Box, Divider } from "@mui/material";
const UseProfileModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          mb={2}
          sx={{ color: "#1d5393" }}
        >
          Quality Engineering CO.
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          User Details
        </Typography>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Name: {user?.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Email: {user?.email}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Role: Admin
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default UseProfileModal;
