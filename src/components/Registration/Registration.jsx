import { React, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BACKEND_URL } from '../../util/consts';
import Button from '../Button/Button';
import './Registration.css';

export default function Registration({ history }) {
	const [registrationState, setRegistrationState] = useState({
		name: '',
		email: '',
		password: '',
	});

	function handleEmailChange(event) {
		setRegistrationState({
			...registrationState,
			email: event.target.value,
		});
	}

	function handlePasswordChange(event) {
		setRegistrationState({
			...registrationState,
			password: event.target.value,
		});
	}

	function handleNameChange(event) {
		setRegistrationState({ ...registrationState, name: event.target.value });
	}

	function processFormSubmit(event) {
		event.preventDefault();
		axios({
			method: 'post',
			url: BACKEND_URL.concat('register'),
			data: JSON.stringify({
				name: registrationState.name,
				email: registrationState.email,
				password: registrationState.password,
			}),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				// eslint-disable-next-line no-console
				console.log(res);
				history.push('/login');
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
			});
	}

	return (
		<div className='registration-wrapper'>
			<h2>Register</h2>
			<form className='registration-form' onSubmit={processFormSubmit}>
				<p className='text-field-header'>Name:</p>
				<input
					placeholder='Enter name'
					value={registrationState.name}
					onChange={handleNameChange}
				/>
				<p className='text-field-header'>Email:</p>
				<input
					placeholder='Enter email'
					value={registrationState.email}
					onChange={handleEmailChange}
				/>
				<p className='text-field-header'>Password:</p>
				<input
					type='password'
					placeholder='Enter password'
					value={registrationState.password}
					onChange={handlePasswordChange}
				/>
				<Button className='app-button' text='Register' type='submit' />
			</form>
		</div>
	);
}

Registration.propTypes = {
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
