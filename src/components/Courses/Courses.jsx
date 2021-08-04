import React, { useState, useSelector } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import Search from '../Search/Search';
import './Courses.css';

export default function Courses() {
	const allCourses = useSelector((state) => state.coursesReducer.courses);
	const [searchResults, setSearchResults] = useState(allCourses);

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
		/>
	));

	return (
		<div className='courses-wrapper'>
			<Search cb={searchFilter} />
			<div className='courses-render-wrapper'>{courses}</div>
		</div>
	);
}
