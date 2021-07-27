import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Courses from './components/Courses';
import Header from './components/Header';
import Login from './components/Login';
import Registration from './components/Registration';
import CreateCourse from './components/CreateCourse';

function App() {
	const [functionsGlobalParams, setFunctionsGlobalParams] = useState({});
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
						passFuncsToApp={setFunctionsGlobalParams}
						funcsFromApp={functionsGlobalParams}
					/>
					<Route path={['/', '/login']} exact component={Login} />
					<Route path='/courses' exact component={Courses} />
					<PropsRoute
						exact
						path='/courses/add'
						component={CreateCourse}
						passFuncsToApp={setFunctionsGlobalParams}
						funcsFromApp={functionsGlobalParams}
					/>
					<Route path='/register' exact component={Registration} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
