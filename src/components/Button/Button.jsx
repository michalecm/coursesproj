import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ text, onClick, type }) {
	return (
		<button
			aria-label='submit'
			// eslint-disable-next-line react/button-has-type
			type={type}
			className='app-button'
			onClick={onClick}
		>
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

Button.defaultProps = {
	onClick: () => {},
	type: 'button',
};
