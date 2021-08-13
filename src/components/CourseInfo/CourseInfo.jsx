import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import formatDuration, { retrieveAuthorNames } from "../../util/funcs";
import "./CourseInfo.css";

export default function CourseInfo() {
  const authorsList = useSelector((state) => state.authorsReducer);
  const coursesList = useSelector((state) => state.coursesReducer);
  const [courseData, setCourseData] = useState({});

  const { id: slug } = useParams();
  useEffect(() => {
    let data = coursesList.courses.filter((course) => course.id === slug);
    [data] = data;
    setCourseData(data);
  }, [coursesList]);

  return !authorsList.isLoading && !coursesList.isLoading ? (
    <div className="course-info-wrapper">
      <div className="backlink">
        <Link to="/courses"> &#60; Back to courses </Link>
      </div>
      <div className="course-info-title">
        <h2>{courseData.title}</h2>
      </div>
      <div className="course-info-bottom">
        <div className="course-info-description">
          <p>{courseData.description}</p>
        </div>
        <div>
          <div className="stateItem">
            <div className="stateLabel">ID: </div>
            <div className="id">{courseData.id}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Duration: </div>
            <div className="id">{formatDuration(courseData.duration)}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Created: </div>
            <div className="id">{courseData.creationDate}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Authors: </div>
            <div className="id-authors-divs">
              {retrieveAuthorNames(courseData.authors, authorsList.authors)
                .sort()
                .map((author) => (
                  <div key={`${author}key`} className="course-info-author">
                    <div className="author-space">{author}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
}
