import axios from "axios";
import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import FullScreenLoading from "../components/FullScreenLoading";
import { authReducer } from "../reducer/authReducer";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const loadAuthState = () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: savedToken,
            user: savedUser,
          },
        });
      }
      setInitialLoadComplete(true);
    };

    // Add a 2-second delay before loading the auth state
    setTimeout(loadAuthState, 2000);
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        const { token, user } = response.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Add a small delay before dispatching success
        setTimeout(() => {
          dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
        }, 100);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : "Login failed",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // console.log("from auth context", state);

  if (!initialLoadComplete) {
    return <FullScreenLoading />; 
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
