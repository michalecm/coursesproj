import React, { useState } from 'react';
import CourseCard from './CourseCard';
import Search from './Search';
import { mockedCoursesList } from '../util/consts';

import CreateCourse from './CreateCourse';

export default function Courses() {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const originalCourses = mockedCoursesList;

	function searchFilter(text) {
		setCoursesList(
			originalCourses.filter(
				(course) => course.title.includes(text) || course.id.includes(text)
			)
		);
	}

	const courses = coursesList.map((course, i) => (
		<CourseCard
			key={course.id}
			id={course.id}
			title={course.title}
			description={course.description}
			creationDate={course.creationDate}
			authors={course.authors}
			duration={course.duration}
		/>
	));

	return (
		<div className='courses-wrapper'>
			<Search cb={searchFilter} />
			<div className='courses-render-wrapper'>{courses}</div>
			<CreateCourse />
		</div>
	);
}
