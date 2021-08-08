import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import formatDuration, { retrieveAuthorNames } from "../../util/funcs";
import "./CourseInfo.css";

export default function CourseInfo() {
  const location = useLocation();
  const { myData } = location.state;
  const authorsList = useSelector((state) => state.authorsReducer);
  const coursesList = useSelector((state) => state.coursesReducer);

  return !authorsList.isLoading && !coursesList.isLoading ? (
    <div className="course-info-wrapper">
      <div className="backlink">
        <Link to="/courses"> &#60; Back to courses </Link>
      </div>
      <div className="course-info-title">
        <h2>{myData.title}</h2>
      </div>
      <div className="course-info-bottom">
        <div className="course-info-description">
          <p>{myData.description}</p>
        </div>
        <div>
          <div className="stateItem">
            <div className="stateLabel">ID: </div>
            <div className="id">{myData.id}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Duration: </div>
            <div className="id">{formatDuration(myData.duration)}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Created: </div>
            <div className="id">{myData.creationDate}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Authors: </div>
            <div className="id-authors-divs">
              {retrieveAuthorNames(myData.authors, authorsList.authors)
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
