import { LOGIN, LOGOUT } from './actionTypes';

export const logOut = (status) => ({
	type: LOGOUT,
	payload: status,
});

export const logIn = (userData) => ({
	type: LOGIN,
	payload: { ...userData },
});
