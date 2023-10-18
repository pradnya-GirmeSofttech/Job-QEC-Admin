// src/hooks/useAuthorization.js

import { useSelector } from "react-redux";

// Define custom hook for role-based authorization
export const useAuthorization = (allowedRoles) => {
  const user = useSelector((state) => state.auth.user);

  // Check if the user's role is allowed for the feature
  const isAuthorized = allowedRoles.includes(user.role);

  return isAuthorized;
};
