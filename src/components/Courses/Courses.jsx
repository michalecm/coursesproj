import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import './Courses.css';

export default function Courses() {
	const allCourses = useSelector((state) => state.coursesReducer);
	const [searchResults, setSearchResults] = useState(allCourses.courses);

	function searchFilter(text) {
		if (!text) {
			setSearchResults(allCourses.courses);
		} else {
			setSearchResults(
				allCourses.courses.filter(
					(course) => course.title.includes(text) || course.id.includes(text)
				)
			);
		}
	}
	// eslint-disable-next-line no-console
	console.log(allCourses.courses);
	// eslint-disable-next-line no-debugger
	debugger;
	const courses = !allCourses.isLoading
		? searchResults.map((course, i) => (
				<CourseCard
					key={course.id}
					id={course.id}
					title={course.title}
					description={course.description}
					creationDate={course.creationDate}
					authors={course.authors}
					duration={course.duration}
				/>
		  ))
		: [];

	return !allCourses.isLoading ? (
		<div className='courses-wrapper'>
			<Search cb={searchFilter} />
			<div className='courses-render-wrapper'>{courses}</div>
		</div>
	) : (
		<div />
	);
}
