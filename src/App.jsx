import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { BACKEND_URL } from './util/consts';

function App() {
	const [coursesList, setCoursesList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	const [userCreatedAuthors, setUserCreatedAuthors] = useState([]);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.log(localStorage.getItem('user'));
		if (localStorage.getItem('user') === undefined) {
			window.location.replace('/login');
		}
	}, []);

	useEffect(() => {
		if (coursesList.length === 0) {
			axios
				.get(BACKEND_URL.concat('courses/all'))
				.then((data) => data.data.result)
				.then((res) => setCoursesList(res));
		}
	}, [coursesList]);

	useEffect(() => {
		if (authorsList.length === 0) {
			axios
				.get(BACKEND_URL.concat('authors/all'))
				.then((data) => data.data.result)
				.then((res) => setAuthorsList(res));
		}
	}, [authorsList]);

	const renderMergedProps = (component, ...rest) => {
		const finalProps = Object.assign({}, ...rest);
		return React.createElement(component, finalProps);
	};

	const PropsRoute = ({ component, ...rest }) => (
		<Route
			/* eslint-disable react/jsx-props-no-spreading */
			{...rest}
			render={(routeProps) => renderMergedProps(component, routeProps, rest)}
		/>
	);

	PropsRoute.propTypes = {
		component: PropTypes.func.isRequired,
	};

	return (
		<Router>
			<div className='App'>
				<Header />
				<Switch>
					<PropsRoute
						exact
						path='/courses'
						component={Courses}
						coursesList={coursesList}
						userCreatedAuthors={userCreatedAuthors}
					/>
					<Route path={['/', '/login']} exact component={Login} />
					<PropsRoute
						exact
						path='/courses/add'
						component={CreateCourse}
						coursesList={coursesList}
						setCoursesList={setCoursesList}
						userCreatedAuthors={userCreatedAuthors}
						setUserCreatedAuthors={setUserCreatedAuthors}
						authorsList={authorsList}
					/>
					<Route path='/register' exact component={Registration} />
					<PropsRoute
						exact
						path='/courses/:id'
						component={CourseInfo}
						authorsList={authorsList}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
