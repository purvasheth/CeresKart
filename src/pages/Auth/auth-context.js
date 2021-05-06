import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { errorToast } from "../../components/toasts";
import { fakeAuthAPI } from "./fakeAuthAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage) {
      const loginStatus = JSON.parse(localStorage?.getItem("login"));
      setIsLogin(loginStatus);
    }
  }, []);

  async function loginUser(username, password) {
    try {
      setIsLoading(true);
      const response = await fakeAuthAPI(username, password);
      if (response.success) {
        setIsLogin(true);
        if (localStorage) {
          localStorage.setItem("login", JSON.stringify(true));
        }
        setIsLoading(false);
        return "success";
      }
    } catch (error) {
      errorToast("Invalid username or password");
    }
  }

  function signoutUser() {
    setIsLogin(false);
    localStorage.setItem("login", JSON.stringify(false));
  }

  return (
    <AuthContext.Provider
      value={{ isLogin, loginUser, signoutUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
