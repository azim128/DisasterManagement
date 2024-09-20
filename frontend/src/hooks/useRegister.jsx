import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/variables";

const useRegister = () => {
  const { dispatch } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, email, password, phoneNumber) => {
    setLoading(true);
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone_number: phoneNumber,
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.data.message);
        dispatch({ type: "SET_LOADING", payload: false });
        navigate("/");
      } else {
        dispatch({ type: "SET_ERROR", payload: data.message });
        toast.error(data.message);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred during registration. Please try again.",
      });

      toast.error(
        error.response.data.message ||
          "An error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_ERROR", payload: null });
    }
  };

  return { register, loading };
};

export default useRegister;
