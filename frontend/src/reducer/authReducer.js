export const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  