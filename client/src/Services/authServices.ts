import httpClient from "./httpClient";

import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { UserLogInPayloadType, UserRegisterPayloadType } from "../types"; 
import snackBarStore from "../components/snackbar/store/snackBarStore";

export const signup = async (
  payload: UserRegisterPayloadType,
  redirectTo: NavigateFunction
) => {
  try {
    const response = await httpClient.post("user", payload);
    if (response && response.data) {
      const { data } = response;
      storeTokensToLocal(data.accessToken, data.refreshToken);
    snackBarStore.showSnackBar("Signup success", "success");
    redirectTo("/home");
    } else {
      snackBarStore.showSnackBar(
        `Problem in Signup: ${response.data}`,
        "error"
      );
    }
  } catch (error: any) {
    const errorMessage = error.response ? error.response.data : error.message;
    snackBarStore.showSnackBar(
      `Problem in Signup: ${errorMessage}`,
      "error"
    );
    console.error(error);
  }
};

export const login = async (
  payload: UserLogInPayloadType,
  redirectTo: NavigateFunction
) => {
  try {
    const response = await httpClient.post("user/login", payload);
    const { data } = response;
    if (data) {
      storeTokensToLocal(data.accessToken, data.refreshToken);
      redirectTo("/home");
      snackBarStore.showSnackBar("Login success", "success");
    } else {
      // Handle the case where response.data is undefined
      snackBarStore.showSnackBar("Invalid response data", "error");
    }
  } catch (error: any) {
    // Check if error.response exists before accessing its data property
    const errorMessage = error.response ? error.response.data : error.message;
    snackBarStore.showSnackBar(`Problem in Login: ${errorMessage}`, "error");
    console.error(error);
  }
};



export const handleRefreshToken = async () => {
  try {
    const { data } = await axios.get("auth/refresh-token");
    storeTokensToLocal(data.accessToken, data.refreshToken);
  } catch (error) {
    console.error(error);
  }
};

export const logout = (redirectTo: NavigateFunction) => {
  clearTokensFromLocal();
  redirectTo("/login");
};

const storeTokensToLocal = (
  accessToken: string,
  refreshToken: string
): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokensFromLocal = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
