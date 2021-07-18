import React from "react";

export default function CourseCard({ title }) {
  return (
    <div className="course-card-wrapper">
      <div className="course-info">
        <div className="course-header"></div>
        <div className="course-about">{title}</div>
      </div>
      <div className="course-meta-info">
        <div className="course-metadata">
          <div className="subject-left-info-right"></div>
          <div className="subject-left-info-right"></div>
          <div className="subject-left-info-right"></div>
        </div>
        <button></button>
      </div>
    </div>
  );
}
