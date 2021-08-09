import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import Input from '../Input/Input';
import APIService from '../../util/APIService';
import './CreateCourse.css';
import { ENDPOINTS } from '../../util/consts';
import { addCourse } from '../../store/courses/actionCreators';
import { deleteAuthor, addAuthor } from '../../store/authors/actionCreators';

export default function CreateCourse({ history }) {
	const allAuthors = useSelector((state) => state.authorsReducer.authors);
	const auth = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const [newCourseData, setNewCourseData] = useState({
		authorField: '',
		chosenAuthors: [],
		title: '',
		description: '',
		duration: 0,
		id: uuidv4(),
	});

	function addAuthorToChosen(newAuthor) {
		if (newCourseData.chosenAuthors.includes(newAuthor)) {
			return;
		}
		setNewCourseData({
			...newCourseData,
			chosenAuthors: [...newCourseData.chosenAuthors, newAuthor],
		});
	}

	function removeAuthorFromChosen(author) {
		setNewCourseData({
			...newCourseData,
			chosenAuthors: [
				...newCourseData.chosenAuthors.filter((aut) => aut !== author),
			],
		});
	}

	function handleTitleChange(event) {
		setNewCourseData({ ...newCourseData, title: event.target.value });
	}

	function handleCustomAuthorChange(event) {
		setNewCourseData({
			...newCourseData,
			authorField: event.target.value,
		});
	}

	function handleDescriptionChange(event) {
		setNewCourseData({ ...newCourseData, description: event.target.value });
	}

	function handleDurationChange(event) {
		setNewCourseData({ ...newCourseData, duration: event.target.value });
	}

	function handleCreateAuthor() {
		const authorID = uuidv4();
		APIService.Post(
			ENDPOINTS.POST_ADD_AUTHOR,
			{ name: newCourseData.authorField, id: authorID },
			auth.token
		)
			.then((res) => {
				// eslint-disable-next-line no-console
				console.log(res);
				dispatch(addAuthor({ name: newCourseData.authorField, id: authorID }));
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
				// eslint-disable-next-line no-alert
				alert('you are not logged in as admin');
			});
	}

	function handleDeleteAuthor(id) {
		// eslint-disable-next-line no-console
		console.log(id);
		APIService.DELETE(ENDPOINTS.DELETE_AUTHOR_BY_ID, id, auth.token)
			.then((res) => {
				// eslint-disable-next-line no-console
				console.log('test 2');
				// eslint-disable-next-line no-console
				console.log(res);
				// eslint-disable-next-line no-console
				console.log('res just printed');
				if (res.result !== false) {
					// eslint-disable-next-line no-console
					console.log(res);
					// eslint-disable-next-line no-console
					console.log('dispatching delete author');
					dispatch(deleteAuthor(id));
				}
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
				// eslint-disable-next-line no-console
				console.log('we are in error territory');
				// eslint-disable-next-line no-alert
				alert('you are not logged in as admin');
			});
	}

	function handleCreateCourse(event) {
		event.preventDefault();
		APIService.Post(
			ENDPOINTS.POST_ADD_COURSE,
			{
				title: newCourseData.title,
				description: newCourseData.description,
				creationDate: new Date().toLocaleDateString(),
				duration: Number(newCourseData.duration),
				authors: newCourseData.chosenAuthors.map((author) => author.id),
				id: newCourseData.id,
			},
			auth.token
		)
			.then((res) => {
				// eslint-disable-next-line no-console
				console.log(res);
				dispatch(addCourse(res.result));
				history.push('/courses');
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
				// eslint-disable-next-line no-alert
				alert('you are not logged in as admin');
			});
	}

	const authorsDivs = allAuthors.sort().map((author) => (
		<div key={`${author.id}key`} className='author-w-button'>
			<div className='author-space'>
				{author.name}
				<MdDelete onClick={() => handleDeleteAuthor(author.id)} />
			</div>
			<Button text='Add Author' onClick={() => addAuthorToChosen(author)} />
		</div>
	));

	const courseAuthorsDivs = newCourseData.chosenAuthors.map((author) => (
		<div className='author-w-button'>
			<div className='author-space'>{author.name}</div>
			<Button
				text='Delete Author'
				onClick={() => removeAuthorFromChosen(author)}
			/>
		</div>
	));

	return (
		<form className='create-course-wrapper' onSubmit={handleCreateCourse}>
			<div className='create-course-top'>
				<div className='create-course-title-entry-wrapper'>
					<div className='create-course-title-form'>
						<p className='text-field-header'>Title</p>
						<Input
							placeholder='test'
							type='text'
							value={newCourseData.title}
							onChange={handleTitleChange}
						/>
					</div>
					<div className='create-course-title-button'>
						<Button className='app-button' text='Create Course' type='submit' />
					</div>
				</div>
				<div className='create-course-description-wrapper'>
					<p className='text-field-header'>Description</p>
					<textarea
						placeholder='test description text'
						value={newCourseData.description}
						onChange={handleDescriptionChange}
					/>
				</div>
			</div>
			<div className='create-course-bottom'>
				<div className='cc-bottom-left'>
					<div className='cc-add-author'>
						<div className='create-author-wrapper'>
							<h3 className='text-field-header'>Author Name</h3>
							<Input
								type='text'
								placeholder='Enter author name...'
								onChange={handleCustomAuthorChange}
								value={newCourseData.authorField}
							/>
						</div>
						<Button
							className='app-button'
							text='Create Author'
							onClick={handleCreateAuthor}
						/>
					</div>
					<div className='cc-add-duration'>
						<div className='create-duration-wrapper'>
							<h3 className='text-field-header'>Duration</h3>
							<Input
								type='text'
								value={`${newCourseData.duration}`}
								onChange={handleDurationChange}
							/>
						</div>
					</div>
				</div>
				<div className='cc-bottom-right'>
					<div className='cc-authors'>
						<h3>Authors</h3>
						<div>{authorsDivs}</div>
					</div>
					<div className='cc-course-authors'>
						<h3>Course Authors</h3>
						<div>{courseAuthorsDivs}</div>
					</div>
				</div>
			</div>
		</form>
	);
}

CreateCourse.propTypes = {
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
