import Axios from "axios";
import { API_BASE_URL } from "../constants";

export async function login(loginRequest) {
  let response = await Axios.post(API_BASE_URL + "/users/login/", loginRequest);
  return response?.data;
}

export async function register(registerRequest) {
  let response = await Axios.post(
    API_BASE_URL + "/users/register/",
    registerRequest
  );
  return response?.data;
}
