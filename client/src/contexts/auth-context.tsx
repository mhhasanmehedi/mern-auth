/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

// auth state interface
interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  message?: string;
}

// Action Types
type AuthAction =
  | { type: "AUTH_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOAD_USER_SUCCESS"; payload: User }
  | { type: "REGISTER_SUCCESS"; payload: string }
  | { type: "LOGOUT" }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" };

// Initial State
const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    case "CLEAR_ERRORS":
      return { ...state, error: null };

    default:
      return state;
  }
};

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearErrors: () => void;
  backendUrl: string;
}

// Create Context
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = "http://localhost:5000/api";

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    try {
      dispatch({ type: "AUTH_REQUEST" });
      const { data } = await axios.get(backendUrl + "/auth/me");
      dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
    } catch (err: any) {
      dispatch({ type: "AUTH_ERROR", payload: err.response?.data?.message });
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "AUTH_REQUEST" });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        backendUrl + "/auth/login",
        { email, password },
        config
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
    } catch (err: any) {
      dispatch({ type: "AUTH_ERROR", payload: err.response?.data?.message });
    }
  };

  // Register
  const register = async (userData: any) => {
    try {
      dispatch({ type: "AUTH_REQUEST" });

      // const config = { headers: { "Content-Type": "multipart/form-data" } };
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        backendUrl + "/auth/register",
        userData,
        config
      );
      dispatch({ type: "REGISTER_SUCCESS", payload: data.message });
    } catch (err: any) {
      dispatch({ type: "AUTH_ERROR", payload: err.response?.data?.message });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(backendUrl + "/auth/logout");
      dispatch({ type: "LOGOUT" });
    } catch (err: any) {
      dispatch({ type: "AUTH_ERROR", payload: err.response?.data?.message });
    }
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        loadUser,
        clearErrors,
        backendUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
