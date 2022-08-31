import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function fetchCustomer(phone) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/customers/phone/" + phone, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function addCustomer(Customer) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(
    API_BASE_URL + "/customers",
    Customer,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      },
    }
  );
  return response?.data;
}

export async function removeCustomer(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.delete(API_BASE_URL + "/customers/" + id, {
    headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) },
  });
  return response?.data;
}
