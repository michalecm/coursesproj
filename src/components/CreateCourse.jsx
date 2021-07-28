import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { mockedAuthorsList } from '../util/consts';
import Button from './Button';
import Input from './Input';

export default function CreateCourse({
	coursesList,
	setCoursesList,
	userCreatedAuthors,
	setUserCreatedAuthors,
	history,
	authorsList,
}) {
	const [newCourseData, setNewCourseData] = useState({
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
		if (newCourseData.authors.chosenAuthors.includes(newAuthor)) {
			return;
		}
		setNewCourseData({
			...newCourseData,
			authors: {
				...newCourseData.authors,
				chosenAuthors: [...newCourseData.authors.chosenAuthors, newAuthor],
			},
		});
	}

	function removeAuthorFromChosen(author) {
		setNewCourseData({
			...newCourseData,
			authors: {
				...newCourseData.authors,
				authorField: '',
				chosenAuthors: [
					...newCourseData.authors.chosenAuthors.filter(
						(aut) => aut !== author
					),
				],
			},
		});
	}

	function addCourse(course, userCreatedAuthorsParam) {
		setUserCreatedAuthors([...userCreatedAuthors, ...userCreatedAuthorsParam]);
		setCoursesList([course, ...coursesList]);
	}

	function processAddCourse(event) {
		event.preventDefault();
		addCourse(
			{
				id: newCourseData.id,
				title: newCourseData.title,
				description: newCourseData.description,
				creationDate: new Date().toLocaleDateString(),
				duration: Number(newCourseData.duration),
				authors: newCourseData.authors.chosenAuthors.map((author) => author.id),
			},
			newCourseData.authors.chosenAuthors
		);
		history.push('/courses');
	}

	function handleTitleChange(event) {
		setNewCourseData({ ...newCourseData, title: event.target.value });
	}

	function handleCustomAuthorChange(event) {
		setNewCourseData({
			...newCourseData,
			authors: {
				...newCourseData.authors,
				authorField: { name: event.target.value, id: '' },
			},
		});
	}

	function addCustomAuthorToCustomAuthors() {
		setNewCourseData({
			...newCourseData,
			authors: {
				...newCourseData.authors,
				customAuthors: [
					...newCourseData.authors.customAuthors,
					{ ...newCourseData.authors.authorField, id: uuidv4() },
				],
			},
		});
	}

	function handleDescriptionChange(event) {
		setNewCourseData({ ...newCourseData, description: event.target.value });
	}

	function handleDurationChange(event) {
		setNewCourseData({ ...newCourseData, duration: event.target.value });
	}

	const authorsDivs = [
		...newCourseData.authors.customAuthors,
		...newCourseData.authors.defaultAuthors,
	]
		.sort()
		.map((author) => (
			<div key={`${author.name}key`} className='author-w-button'>
				<div className='author-space'>{author.name}</div>
				<Button text='Add Author' onClick={() => addAuthorToChosen(author)} />
			</div>
		));

	const courseAuthorsDivs = newCourseData.authors.chosenAuthors.map(
		(author) => (
			<div className='author-w-button'>
				<div className='author-space'>{author.name}</div>
				<Button
					text='Delete Author'
					onClick={() => removeAuthorFromChosen(author)}
				/>
			</div>
		)
	);

	return (
		<form className='create-course-wrapper' onSubmit={processAddCourse}>
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
								value={newCourseData.authors.authorField.name}
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
	setCoursesList: PropTypes.func.isRequired,
	coursesList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userCreatedAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
	setUserCreatedAuthors: PropTypes.func.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	authorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
