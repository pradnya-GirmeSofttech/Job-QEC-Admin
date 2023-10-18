import React from "react";
import { Modal, Typography, Button, Box } from "@mui/material";

function ViewUserDetails({ user, onClose, isOpen }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Details
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Name: {user?.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Email: {user?.email}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Role: {user?.role}
        </Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ViewUserDetails;
