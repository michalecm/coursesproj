import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function Search(props) {
	const [searchVal, setSearchVal] = useState('');
	function handleInputChange(e) {
		setSearchVal(e.target.value);
	}
	function handleFormSubmit(e) {
		props.cb(searchVal);
		e.preventDefault();
	}
	return (
		<div className='search-wrapper'>
			<form className='search-wrapper-form' onSubmit={handleFormSubmit}>
				<input
					className='search-course'
					name='searchText'
					type='text'
					placeholder='Enter course name...'
					onChange={handleInputChange}
				/>
				<input className='app-button' type='submit' value='Search' />
			</form>
			<Button text='Add Course' />
			{/* <button type='submit' className='app-button'>
				Add Course
			</button> */}
		</div>
	);
}

Search.propTypes = {
	cb: PropTypes.func.isRequired,
};
