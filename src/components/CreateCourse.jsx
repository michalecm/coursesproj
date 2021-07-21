import React, { useState } from 'react';

import { mockedAuthorsList } from '../util/consts';

export default function CreateCourse() {
	function addAuthor(name) {
		if (courseAuthorsForCourse.includes(name)) {
			return;
		}
		setCourseAuthorsForCourse([...courseAuthorsForCourse, name]);
	}
	function removeAuthor(name) {
		setCourseAuthorsForCourse([
			...courseAuthorsForCourse.filter((author) => author !== name),
		]);
	}
	const [courseAuthorsForCourse, setCourseAuthorsForCourse] = useState([]);

	const authorsDivs = mockedAuthorsList.map((author) => (
		<div key={`${author.name}key`} className='author-w-button'>
			<div className='author-space'>{author.name}</div>
			<button
				type='submit'
				onClick={() => addAuthor(author.name)}
				className='app-button'
			>
				Add Author
			</button>
		</div>
	));

	const courseAuthorsDivs = courseAuthorsForCourse.map((author) => (
		<div className='author-w-button'>
			<div className='author-space'>{author}</div>
			<button
				type='submit'
				onClick={() => removeAuthor(author)}
				className='app-button'
			>
				Delete Author
			</button>
		</div>
	));

	return (
		<div className='create-course-wrapper'>
			<div className='create-course-top'>
				<div className='create-course-title-entry-wrapper'>
					<div className='create-course-title-form'>
						<p className='text-field-header'>Title</p>
						<input placeholder='test' type='text' />
					</div>
					<div className='create-course-title-button'>
						<input className='app-button' type='submit' value='Create Course' />
					</div>
				</div>
				<div className='create-course-description-wrapper'>
					<p className='text-field-header'>Description</p>
					<textarea placeholder='test description text' />
				</div>
			</div>
			<div className='create-course-bottom'>
				<div className='cc-bottom-left'>
					<div className='cc-add-author'>
						<div className='create-author-wrapper'>
							<h3 className='text-field-header'>Author Name</h3>
							<input type='text' placeholder='Enter author name...' />
						</div>
						<button type='submit' className='app-button'>
							Create Author
						</button>
					</div>
					<div className='cc-add-duration'>
						<div className='create-duration-wrapper'>
							<h3 className='text-field-header'>Duration</h3>
							<input type='text' />
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
		</div>
	);
}
