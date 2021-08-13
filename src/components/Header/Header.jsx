import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../../store/users/thunk';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header() {
	const user = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	function handleLogout() {
		dispatch(postLogOut());
	}

	const userInfoHeader = user.isAuth ? (
		<div className='user-info-header'>
			<p>{user.name || ''}</p>
		</div>
	) : (
		<div />
	);
	return (
		<div className='header'>
			<Logo />
			<div className='header-text-wrapper'>
				{userInfoHeader}
				{/* remove user login token */}
				<Button text='Logout' onClick={handleLogout} />
			</div>
		</div>
	);
}
