import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import {
  loginService,
  resetPasswordService,
  signupService,
} from "./auth-services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  async function loginUser(email, password) {
    const response = await loginService(email, password);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if ("token" in response) {
      setToken(response.token);
      if (localStorage) {
        localStorage.setItem("token", response.token);
      }
      return true;
    }
    return false;
  }

  async function resetPassword(email, password) {
    const response = await resetPasswordService(email, password);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if ("message" in response && response.message === "success") {
      return true;
    }
  }

  async function signupUser(user) {
    const response = await signupService(user);
    if ("errors" in response) {
      return { errors: response.errors };
    }
    if ("token" in response) {
      setToken(response.token);
      if (localStorage) {
        localStorage.setItem("token", response.token);
      }
      return true;
    }
    return false;
  }

  function logoutUser() {
    setToken("");
    if (localStorage) {
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loginUser,
        signupUser,
        resetPassword,
        logoutUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
