import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Button from '../Button/Button';
import formatDuration, { getCourseAuthors } from '../../util/funcs';
import { postDeleteCourse } from '../../store/courses/thunk';
import './CourseCard.css';

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
		dispatch(postDeleteCourse(id, appstate.userReducer.token));
	}

	return (
		<div id={id} className='course-card-wrapper'>
			<div className='course-info'>
				<div className='course-header'>
					<h2>{title}</h2> 
				</div>
				<div className='course-about'>{description}</div>
			</div>
			<div className='course-meta-info'>
				<div className='course-metadata'>
					<div className='subject-left-info-right'>
						<div className='left-right-header'>Authors:</div>
						<div className='authors'>
							{getCourseAuthors([...appstate.authorsReducer.authors], authors)}
						</div>
					</div>
					<div className='subject-left-info-right'>
						<div className='left-right-header'>Duration:</div>
						<div>{formatDuration(duration)}</div>
					</div>
					<div className='subject-left-info-right'>
						<div className='left-right-header'>Created:</div>
						<div>{creationDate}</div>
					</div>
				</div>
				<div className='cc-button-icon-wrapper'>
					<Link to={`/courses/${id}`}>
						<Button text='Show course' />
					</Link>
					{appstate.userReducer.role === 'admin' && (
						<div className='edit-delete-buttons'>
							<MdDelete className='icons' onClick={handleDeleteCourse} />
							<Link to={`/courses/update/${id}`}>
								<MdModeEdit className='icons' />
							</Link>
						</div>
					)}
				</div>
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
