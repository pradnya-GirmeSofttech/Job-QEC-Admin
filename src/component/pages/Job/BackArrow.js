import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";

export const ArrowBack = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1); // This will navigate back to the previous screen
  };
  return (
    <IconButton onClick={handleBackButtonClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};
