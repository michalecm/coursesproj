import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams, matchPath, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './CourseForm.css';
import { postAuthor, postDeleteAuthor } from '../../store/authors/thunk';
import { postUpdateCourse, postAddCourse } from '../../store/courses/thunk';

export default function CourseForm({ history }) {
	const { id: slug } = useParams();

	const currentPath = useLocation();
	const isUpdating =
		matchPath(currentPath.pathname, {
			path: `/courses/update/${slug}`,
			exact: true,
			strict: true,
		}) !== null;

	const allAuthors = useSelector((state) => state.authorsReducer.authors);
	const allCourses = useSelector((state) => state.coursesReducer.courses);
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

	useEffect(() => {
		if (auth.role === 'admin' && isUpdating) {
			let data = allCourses.filter((course) => course.id === slug);
			if (!data.length > 0) {
				history.push('/courses');
			} else {
				[data] = data;
				// eslint-disable-next-line no-console
				console.dir(data);
				const updateAuthors = allAuthors.filter((a) =>
					data.authors.includes(a.id)
				);
				// eslint-disable-next-line no-console
				console.dir(updateAuthors);

				setNewCourseData({
					authorField: '',
					chosenAuthors: updateAuthors,
					title: data.title,
					description: data.description,
					duration: data.duration,
					id: data.id,
				});
			}
		}
	}, [allCourses, allAuthors, auth.role, history, isUpdating, slug]);

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

	function handleCreateAuthor(event) {
		event.preventDefault();
		if (!newCourseData.authorField.length > 0) {
			// eslint-disable-next-line no-alert
			alert('Please fill in a name for the author you are attemping to add');
			return;
		}
		dispatch(postAuthor({ name: newCourseData.authorField }, auth.token));
	}

	function handleDeleteAuthor(id) {
		dispatch(postDeleteAuthor(id, auth.token));
	}

	function handleCourseUpdate(event) {
		event.preventDefault();
		if (
			!(
				newCourseData.duration > 0 &&
				newCourseData.title.length > 0 &&
				newCourseData.description.length > 0 &&
				newCourseData.chosenAuthors.length > 0
			)
		) {
			// eslint-disable-next-line no-alert
			alert(
				'Please fill out all fields. Courses must have a duration and an author.'
			);
			return;
		}

		dispatch(
			postUpdateCourse(
				newCourseData.id,
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
		);
		history.push('/courses');
	}

	function handleCourseForm(event) {
		event.preventDefault();
		if (
			!(
				newCourseData.duration > 0 &&
				newCourseData.title.length > 0 &&
				newCourseData.description.length > 0 &&
				newCourseData.chosenAuthors.length > 0
			)
		) {
			// eslint-disable-next-line no-alert
			alert(
				'Please fill out all fields. Courses must have a duration and an author.'
			);
			return;
		}
		dispatch(
			postAddCourse(
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
		);
		history.push('/courses');
	}

	const authorsDivs = allAuthors.sort().map((author) => (
		<div key={`${author.id}key`} className='author-w-button'>
			<div className='author-space'>{author.name}</div>
			<div className='delete-add-buttons-div'>
				<Button text='Add Author' onClick={() => addAuthorToChosen(author)} />
				<MdDelete
					className='icons'
					onClick={() => handleDeleteAuthor(author.id)}
				/>
			</div>
		</div>
	));

	const courseAuthorsDivs = newCourseData.chosenAuthors.map((author) => (
		<div key={`${author.id}keychosen`} className='author-w-button'>
			<div className='author-space'>{author.name}</div>
			<div className='delete-add-buttons-div'>
				<Button text='Remove' onClick={() => removeAuthorFromChosen(author)} />
			</div>
		</div>
	));

	return (
		<form
			className='create-course-wrapper'
			onSubmit={isUpdating ? handleCourseUpdate : handleCourseForm}
		>
			<div className='backlink'>
				<Link to='/courses'> &#60; Back to courses </Link>
			</div>
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
						<Button
							className='app-button'
							text={isUpdating ? 'Update' : 'Create Course'}
							type='submit'
						/>
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

CourseForm.propTypes = {
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
