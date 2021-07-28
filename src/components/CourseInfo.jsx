import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieveAuthorNames } from '../util/funcs';

export default function CourseInfo({ authorsList }) {
	const { state } = useLocation();
	return (
		<div className='courseInfoWrapper'>
			<div className='backlink'>
				<Link to='/courses'> &#60; Back to courses </Link>
			</div>
			<div>
				<h2>{state.title}</h2>
			</div>
			<div>
				<div>
					<p>{state.description}</p>
				</div>
				<div>
					<div className='stateItem'>
						<div className='stateLabel'>ID: </div>
						<div className='id'>{state.id}</div>
					</div>
					<div className='stateItem'>
						<div className='stateLabel'>Duration: </div>
						<div className='id'>{state.duration}</div>
					</div>
					<div className='stateItem'>
						<div className='stateLabel'>Created: </div>
						<div className='id'>{state.creationDate}</div>
					</div>
					<div className='stateItem'>
						<div className='stateLabel'>Authors: </div>
						<div className='id'>
							{retrieveAuthorNames(state.authors, authorsList)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

CourseInfo.propTypes = {
	authorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
