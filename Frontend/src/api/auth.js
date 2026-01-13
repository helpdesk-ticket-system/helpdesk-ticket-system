import api from "./axios";

export const loginUser = (data) =>
  api.post("/accounts/login/", data);
export const registerUser = (data) =>
  api.post("/accounts/register/", data);

export const getCurrentUser = () =>
  api.get("/accounts/me/");


export const logoutUser = () =>
  api.post("/accounts/logout/");
