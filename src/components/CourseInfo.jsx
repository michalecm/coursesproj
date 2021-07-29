import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import formatDuration, { retrieveAuthorNames } from "../util/funcs";

export default function CourseInfo({ authorsList }) {
  const { state } = useLocation();
  const authorsDivs = retrieveAuthorNames(state.authors, authorsList)
    .sort()
    .map((author) => (
      <div key={`${author}key`} className="course-info-author">
        <div className="author-space">{author}</div>
      </div>
    ));
  return (
    <div className="course-info-wrapper">
      <div className="backlink">
        <Link to="/courses"> &#60; Back to courses </Link>
      </div>
      <div className="course-info-title">
        <h2>{state.title}</h2>
      </div>
      <div className="course-info-bottom">
        <div className="course-info-description">
          <p>{state.description}</p>
        </div>
        <div>
          <div className="stateItem">
            <div className="stateLabel">ID: </div>
            <div className="id">{state.id}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Duration: </div>
            <div className="id">{formatDuration(state.duration)}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Created: </div>
            <div className="id">{state.creationDate}</div>
          </div>
          <div className="stateItem">
            <div className="stateLabel">Authors: </div>
            <div className="id-authors-divs">{authorsDivs}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseInfo.propTypes = {
  authorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
