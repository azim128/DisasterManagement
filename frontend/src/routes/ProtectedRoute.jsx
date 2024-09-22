import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user's role is one of the allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// prop validation
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
