import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
