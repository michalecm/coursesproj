import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Logo from './Logo';

export default function Header() {
	return (
		<div className='header'>
			<Logo />
			<div className='header-text-wrapper'>
				<div className='user-info-header'>
					<p>Mason</p>
				</div>
				<Link to='/login'>
					{/* remove user login token */}
					<Button text='Logout' />
				</Link>
			</div>
		</div>
	);
}
