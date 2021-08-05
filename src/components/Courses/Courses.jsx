import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../CourseCard/CourseCard";
import Search from "../Search/Search";
import "./Courses.css";

export default function Courses() {
  const allCourses = useSelector((state) => state.coursesReducer.courses);
  const [searchResults, setSearchResults] = useState(allCourses);

  // eslint-disable-next-line no-console
  console.log(allCourses);

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
  // eslint-disable-next-line no-console
  console.log(allCourses);
  // eslint-disable-next-line no-console
  console.log(typeof allCourses);
  // eslint-disable-next-line no-debugger
  debugger;
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
    <div className="courses-wrapper">
      <Search cb={searchFilter} />
      <div className="courses-render-wrapper">{courses}</div>
    </div>
  );
}
