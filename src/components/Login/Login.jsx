import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { validateEmail } from '../../util/funcs';
import './Login.css';
import { postLogIn } from '../../store/users/thunk';

export default function Login({ history }) {
	const [loginState, setLoginState] = useState({
		email: '',
		password: '',
	});

	const isAuth = useSelector((state) => state.userReducer.isAuth);

	useEffect(() => {
		if (isAuth) history.push('/courses');
	}, [isAuth, history]);

	const dispatch = useDispatch();

	function handleUsernameChange(event) {
		setLoginState({ ...loginState, email: event.target.value });
	}

	function handlePasswordChange(event) {
		setLoginState({ ...loginState, password: event.target.value });
	}

	function processLogin(event) {
		event.preventDefault();
		if (!validateEmail(loginState.email) || !loginState.password.length > 0) {
			// eslint-disable-next-line no-alert
			alert('Your password or email is invalid.');
			return;
		}
		dispatch(
			postLogIn({
				email: loginState.email,
				password: loginState.password,
			})
		);
	}

	return (
		<div className='login-wrapper'>
			<h2>Login</h2>
			<form className='login-form' onSubmit={processLogin}>
				<p className='text-field-header'>Username:</p>
				<input
					placeholder='Enter username'
					value={loginState.username}
					onChange={handleUsernameChange}
				/>
				<p className='text-field-header'>Password:</p>
				<input
					type='password'
					placeholder='Enter password'
					value={loginState.password}
					onChange={handlePasswordChange}
				/>
				<Button className='app-button' text='Login' type='submit' />
			</form>
			<p>
				If you do not yet have an account, please register{' '}
				<Link to='/register'>here.</Link>
			</p>
		</div>
	);
}

Login.propTypes = {
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
