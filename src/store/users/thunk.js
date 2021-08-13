import APIService from '../../util/APIService';
import { ENDPOINTS } from '../../util/consts';
import { logOut, logIn, getRole } from './actionCreators';

export const postLogOut = (token) => (dispatch) => {
	APIService.Delete(ENDPOINTS.DELETE_LOGOUT, '', token)
		.then((res) => {
			dispatch(logOut());
			localStorage.removeItem('user');
			window.location.replace('/login');
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('you are not logged in as admin');
		});
};

export const postLogIn = (userData) => (dispatch) => {
	let data = {};
	APIService.Post(ENDPOINTS.POST_LOGIN, userData)
		.then((res) => {
			// eslint-disable-next-line no-console
			console.dir(res);
			// eslint-disable-next-line no-console
			console.dir(data);
			data = {
				token: res.result,
				isAuth: res.successful,
				name: res.user.name ? res.user.name : 'admin',
				email: res.email,
			};
			localStorage.setItem('user', res.result);
			// eslint-disable-next-line no-console
			console.log(localStorage.getItem('user'));
			dispatch(logIn(data));
			dispatch(getUserRole());
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('login failed');
			// eslint-disable-next-line no-console
			console.dir(err);
		});
};

export const getUserRole = () => (dispatch) => {
	APIService.Get(ENDPOINTS.GET_CURRENT_USER, {}, localStorage.getItem('user'))
		.then((resp) => {
			dispatch(getRole(resp.role));
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('Login failed: user does not exist or incorrect credentials.');
		});
};

export const registerUser = (userData) => async () => {
	APIService.Post(ENDPOINTS.POST_REGISTER, userData).catch((err) => {
		// eslint-disable-next-line no-alert
		alert(`Registration failed: ${err}`);
	});
};
