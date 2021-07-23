import React from 'react';
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
				<Button text='Logout' />
				{/* <button type='submit' className='app-button'>
					Logout
				</button> */}
			</div>
		</div>
	);
}
