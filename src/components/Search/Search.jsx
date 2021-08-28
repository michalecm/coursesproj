import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Search.css';

export default function Search(props) {
	const [searchVal, setSearchVal] = useState('');
	const user = useSelector((state) => state.userReducer);
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
			{user.role === 'admin' && (
				<Link to='/courses/add'>
					<Button text='Add Course' />
				</Link>
			)}
		</div>
	);
}

Search.propTypes = {
	cb: PropTypes.func.isRequired,
};
