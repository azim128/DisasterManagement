// src/routes/ProtectedRoute.js
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to a "Not Authorized" page if user doesn't have the correct role
    return <Navigate to="/not-authorized" />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;

// prop validation
ProtectedRoute.propTypes = {
  requiredRole: PropTypes.string,
};
