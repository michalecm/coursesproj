import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCard from './CourseCard';
import Search from './Search';

export default function Courses({ coursesList, userCreatedAuthors }) {
	const [searchResults, setSearchResults] = useState(coursesList);
	const allCourses = coursesList;

	function searchFilter(text) {
		if (!text) {
			setSearchResults(allCourses);
		} else {
			setSearchResults(
				allCourses.filter(
					(course) => course.title.includes(text) || course.id.includes(text)
				)
			);
		}
	}
	const courses = searchResults.map((course, i) => (
		<CourseCard
			key={course.id}
			id={course.id}
			title={course.title}
			description={course.description}
			creationDate={course.creationDate}
			authors={course.authors}
			duration={course.duration}
			userCreatedAuthors={userCreatedAuthors}
		/>
	));

	return (
		<div className='courses-wrapper'>
			<Search cb={searchFilter} />
			<div className='courses-render-wrapper'>{courses}</div>
		</div>
	);
}

Courses.propTypes = {
	coursesList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userCreatedAuthors: PropTypes.arrayOf(PropTypes.object).isRequired,
};
