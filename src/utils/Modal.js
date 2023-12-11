import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MyModal = ({
  open,
  onClose,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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

          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          color="inherit"
          edge="end"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 10,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          {description}
        </Typography>
        <Button onClick={onButtonClick} variant="contained">
          {buttonText}
        </Button>
      </Box>
    </Modal>
  );
};

export default MyModal;
