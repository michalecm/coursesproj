import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import Button from "../Button/Button";
import formatDuration, { getCourseAuthors } from "../../util/funcs";
import { deleteCourse } from "../../store/courses/actionCreators";

import "./CourseCard.css";
import APIService from "../../util/APIService";
import { ENDPOINTS } from "../../util/consts";

export default function CourseCard({
  id,
  title,
  description,
  creationDate,
  duration,
  authors,
}) {
  const appstate = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleDeleteCourse() {
    APIService.DELETE(
      ENDPOINTS.DELETE_COURSE_BY_ID,
      { id },
      appstate.userReducer.token
    )
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        dispatch(deleteCourse(id));
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert("you are not logged in as admin");
      });
  }

  return (
    <div id={id} className="course-card-wrapper">
      <div className="course-info">
        <div className="course-header">
          <h2>{title}</h2> <MdDelete onClick={handleDeleteCourse}>X</MdDelete>
        </div>
        <div className="course-about">{description}</div>
      </div>
      <div className="course-meta-info">
        <div className="course-metadata">
          <div className="subject-left-info-right">
            <div className="left-right-header">Authors:</div>
            <div className="authors">
              {getCourseAuthors([...appstate.authorsReducer.authors], authors)}
            </div>
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
              myData: {
                id,
                title,
                description,
                creationDate,
                duration,
                authors,
              },
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
};
