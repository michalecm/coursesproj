import React from "react";
import CourseCard from "./CourseCard";
import Search from "./Search";
import { useSelector } from "react-redux";

export default function Courses() {
  const coursesList = useSelector((state) => state.coursesReducer.filtered);

  const courses = coursesList.map((course, i) => (
    <CourseCard key={i} title={course.title} />
  ));
  return (
    <div className="courses-wrapper">
      <Search />
      <div className="courses-render-wrapper">{courses}</div>
    </div>
  );
}
