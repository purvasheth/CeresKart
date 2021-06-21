import axios from "axios";
import { errorToast } from "../../components/toasts";
import {
  API_LOGIN,
  API_RESET_PASSWORD,
  API_SELF,
  API_SIGNUP,
} from "../../urls";

export async function loginService(email, password) {
  try {
    const response = await axios.post(API_LOGIN, { email, password });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}

export async function signupService(user) {
  try {
    const response = await axios.post(API_SIGNUP, user);
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}

export async function resetPasswordService(email, password) {
  try {
    const response = await axios.post(API_RESET_PASSWORD, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}
export async function validateTokenService(token) {
  try {
    const response = await axios.get(API_SELF, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    return authCatchHandler(error);
  }
}

export function authCatchHandler(error) {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data;
  }
  errorToast("Something is wrong");
}
