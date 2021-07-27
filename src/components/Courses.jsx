import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseCard from './CourseCard';
import Search from './Search';
import { mockedCoursesList } from '../util/consts';

export default function Courses({ passFuncsToApp, funcsFromApp }) {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [userCreatedAuthors, setUserCreatedAuthors] = useState([]);
	const originalCourses = mockedCoursesList;

	function searchFilter(text) {
		setCoursesList(
			originalCourses.filter(
				(course) => course.title.includes(text) || course.id.includes(text)
			)
		);
	}

	function addCourse(course, userCreatedAuthorsParam) {
		setUserCreatedAuthors([...userCreatedAuthors, ...userCreatedAuthorsParam]);
		setCoursesList([course, ...coursesList]);
	}

	passFuncsToApp({ ...funcsFromApp, addCourse });

	const courses = coursesList.map((course, i) => (
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
			{/* <CreateCourse addCourse={addCourse} /> */}
		</div>
	);
}

Courses.propTypes = {
	passFuncsToApp: PropTypes.func.isRequired,
	funcsFromApp: PropTypes.arrayOf(PropTypes.func).isRequired,
};
