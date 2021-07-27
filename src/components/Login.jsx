import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Login() {
	const [loginState, setLoginState] = useState({
		username: '',
		password: '',
	});

	function handleUsernameChange(event) {
		setLoginState({ ...loginState, username: event.target.value });
	}

	function handlePasswordChange(event) {
		setLoginState({ ...loginState, password: event.target.value });
	}

	return (
		<div className='login-wrapper'>
			<h2>Login</h2>
			<form className='login-form'>
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
				<Button className='app-button' text='Login' />
			</form>
			<p>
				If you do not yet have an account, please register{' '}
				<Link to='/registration'>here.</Link>
			</p>
		</div>
	);
}
