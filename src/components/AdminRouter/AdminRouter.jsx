import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function AdminRoute({ component: Component, ...rest }) {
	const isAdmin = useSelector((state) => state.userReducer.role);
	return (
		<Route
			/* eslint-disable react/jsx-props-no-spreading */
			{...rest}
			render={(props) =>
				localStorage.getItem('user') && isAdmin ? (
					/* eslint-disable react/jsx-props-no-spreading */
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/courses',
						}}
					/>
				)
			}
		/>
	);
}

AdminRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
};
