import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      } else {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/auth`);
        if (res.data.success) {
          dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: true, user: res.data.user },
          });
        }
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        setAuthToken(res.data.accessToken);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: res.data.user },
        });

        return res.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: "An unexpected error occurred" };
      }
    }
  };

  // Context data
  const authContextData = { loginUser, authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
