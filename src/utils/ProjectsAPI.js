import Axios from "axios";
import { API_BASE_URL } from "../constants";
import { ACCESS_TOKEN } from "../constants";

export async function getProjects() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/projects", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function getComments(project) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.get(API_BASE_URL + "/comments/"+project, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function addProject(project) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(API_BASE_URL + "/projects", project, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

export async function addComment(comment) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }
  let response = await Axios.post(API_BASE_URL + "/comments", comment, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });
  return response?.data;
}

