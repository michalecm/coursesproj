import { LOGIN, LOGOUT, GET_ROLE } from "./actionTypes";

export const logOut = () => ({
  type: LOGOUT,
});

export const logIn = (userData) => ({
  type: LOGIN,
  payload: { ...userData },
});

export const getRole = (role) => ({
  type: GET_ROLE,
  payload: role,
});
