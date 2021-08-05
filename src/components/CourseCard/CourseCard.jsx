import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { mockedAuthorsList } from "../../util/consts";
import formatDuration from "../../util/funcs";
import "./CourseCard.css";

export default function CourseCard({
  id,
  title,
  description,
  creationDate,
  duration,
  authors,
  userCreatedAuthors,
}) {
  const appstate = useSelector((state) => state);

  function getCourseAuthors() {
    return [...appstate.authorsReducer.authors]
      .filter((author) => authors.includes(author.id))
      .map((authorObj) => authorObj.name)
      .join(", ");
  }

  return (
    <div id={id} className="course-card-wrapper">
      <div className="course-info">
        <div className="course-header">
          <h2>{title}</h2>
        </div>
        <div className="course-about">{description}</div>
      </div>
      <div className="course-meta-info">
        <div className="course-metadata">
          <div className="subject-left-info-right">
            <div className="left-right-header">Authors:</div>
            <div className="authors">{getCourseAuthors()}</div>
          </div>
          <div className="subject-left-info-right">
            <div className="left-right-header">Duration:</div>
            <div>{formatDuration(duration)}</div>
          </div>
          <div className="subject-left-info-right">
            <div className="left-right-header">Created:</div>
            <div>{creationDate}</div>
          </div>
        </div>
        <Link
          to={{
            pathname: `/courses/${id}`,
            state: {
              id,
              title,
              description,
              creationDate,
              duration,
              authors,
              userCreatedAuthors,
            },
          }}
        >
          <Button text="Show course" />
        </Link>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  userCreatedAuthors: PropTypes.arrayOf(PropTypes.object),
};

CourseCard.defaultProps = {
  userCreatedAuthors: [],
};
