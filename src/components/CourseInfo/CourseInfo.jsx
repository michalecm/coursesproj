import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import formatDuration, { retrieveAuthorNames } from "../../util/funcs";
import "./CourseInfo.css";

export default function CourseInfo() {
  const { stateFromLocation } = useLocation();
  const authorsList = useSelector((state) => state.authorsReducer);
  const coursesList = useSelector((state) => state.coursesReducer);

  const authorsDivs = retrieveAuthorNames(
    stateFromLocation.authors,
    authorsList.authors
  )
    .sort()
    .map((author) => (
      <div key={`${author}key`} className="course-info-author">
        <div className="author-space">{author}</div>
      </div>
    ));

  return !authorsList.isLoading && !coursesList.isLoading ? (
    <div className="course-info-wrapper">
      <div className="backlink">
        <Link to="/courses"> &#60; Back to courses </Link>
      </div>
      <div className="course-info-title">
        <h2>{stateFromLocation.title}</h2>
      </div>
      <div className="course-info-bottom">
        <div className="course-info-description">
          <p>{stateFromLocation.description}</p>
        </div>
        <div>
          <div className="stateItem">
            <div className="stateLabel">ID: </div>
            <div className="id">{stateFromLocation.id}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Duration: </div>
            <div className="id">
              {formatDuration(stateFromLocation.duration)}
            </div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Created: </div>
            <div className="id">{stateFromLocation.creationDate}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Authors: </div>
            <div className="id-authors-divs">{authorsDivs}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
