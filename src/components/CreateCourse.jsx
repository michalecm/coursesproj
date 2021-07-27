import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { mockedAuthorsList } from '../util/consts';
import Button from './Button';
import Input from './Input';

export default function CreateCourse({ passFuncsToApp, funcsFromApp }) {
	const [courseState, setCourseState] = useState({
		authors: {
			authorField: '',
			customAuthors: [],
			defaultAuthors: mockedAuthorsList,
			chosenAuthors: [],
		},
		title: '',
		description: '',
		duration: 0,
		id: uuidv4(),
	});

	function addAuthorToChosen(newAuthor) {
		if (courseState.authors.chosenAuthors.includes(newAuthor)) {
			return;
		}
		setCourseState({
			...courseState,
			authors: {
				...courseState.authors,
				chosenAuthors: [...courseState.authors.chosenAuthors, newAuthor],
			},
		});
	}

	function removeAuthorFromChosen(author) {
		setCourseState({
			...courseState,
			authors: {
				...courseState.authors,
				authorField: '',
				chosenAuthors: [
					...courseState.authors.chosenAuthors.filter((aut) => aut !== author),
				],
			},
		});
	}

	function processAddCourse(event) {
		event.preventDefault();
		funcsFromApp.addCourse(
			{
				id: courseState.id,
				title: courseState.title,
				description: courseState.description,
				creationDate: new Date().toLocaleDateString(),
				duration: Number(courseState.duration),
				authors: courseState.authors.chosenAuthors.map((author) => author.id),
			},
			courseState.authors.chosenAuthors
		);
	}

	function handleTitleChange(event) {
		setCourseState({ ...courseState, title: event.target.value });
	}

	function handleCustomAuthorChange(event) {
		setCourseState({
			...courseState,
			authors: {
				...courseState.authors,
				authorField: { name: event.target.value, id: '' },
			},
		});
	}

	function addCustomAuthorToCustomAuthors() {
		setCourseState({
			...courseState,
			authors: {
				...courseState.authors,
				customAuthors: [
					...courseState.authors.customAuthors,
					{ ...courseState.authors.authorField, id: uuidv4() },
				],
			},
		});
	}

	function handleDescriptionChange(event) {
		setCourseState({ ...courseState, description: event.target.value });
	}

	function handleDurationChange(event) {
		setCourseState({ ...courseState, duration: event.target.value });
	}

	const authorsDivs = [
		...courseState.authors.customAuthors,
		...courseState.authors.defaultAuthors,
	]
		.sort()
		.map((author) => (
			<div key={`${author.name}key`} className='author-w-button'>
				<div className='author-space'>{author.name}</div>
				<Button text='Add Author' onClick={() => addAuthorToChosen(author)} />
			</div>
		));

	const courseAuthorsDivs = courseState.authors.chosenAuthors.map((author) => (
		<div className='author-w-button'>
			<div className='author-space'>{author.name}</div>
			<Button
				text='Delete Author'
				onClick={() => removeAuthorFromChosen(author)}
			/>
		</div>
	));

	return (
		<form className='create-course-wrapper' onSubmit={processAddCourse}>
			<div className='create-course-top'>
				<div className='create-course-title-entry-wrapper'>
					<div className='create-course-title-form'>
						<p className='text-field-header'>Title</p>
						<Input
							placeholder='test'
							type='text'
							value={courseState.title}
							onChange={handleTitleChange}
						/>
					</div>
					<div className='create-course-title-button'>
						<Link to='/courses'>
							<Button
								className='app-button'
								text='Create Course'
								type='submit'
							/>
						</Link>
					</div>
				</div>
				<div className='create-course-description-wrapper'>
					<p className='text-field-header'>Description</p>
					<textarea
						placeholder='test description text'
						value={courseState.description}
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
								value={courseState.authors.authorField.name}
							/>
						</div>
						<Button
							className='app-button'
							text='Create Author'
							onClick={addCustomAuthorToCustomAuthors}
						/>
					</div>
					<div className='cc-add-duration'>
						<div className='create-duration-wrapper'>
							<h3 className='text-field-header'>Duration</h3>
							<Input
								type='text'
								value={`${courseState.duration}`}
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
	passFuncsToApp: PropTypes.func.isRequired,
	funcsFromApp: PropTypes.arrayOf(PropTypes.func).isRequired,
};
