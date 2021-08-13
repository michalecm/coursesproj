import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import AdminRoute from "./components/AdminRouter/AdminRouter";
import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import CourseForm from "./components/CourseForm/CourseForm";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import { ENDPOINTS } from "./util/consts";
import APIService from "./util/APIService";
import { addCourses } from "./store/courses/actionCreators";
import { getAllAuthors } from "./store/authors/thunk";

function App() {
  const dispatch = useDispatch();
  const appstate = useSelector((state) => state);

  useEffect(() => {
    if (appstate.coursesReducer.courses.length < 1) {
      APIService.Get(ENDPOINTS.GET_ALL_COURSES).then((courses) => {
        // eslint-disable-next-line no-console
        console.dir(courses);
        dispatch(addCourses(courses));
      });
    }
  }, [dispatch, appstate.coursesReducer.courses.length]);

  useEffect(() => {
    if (appstate.authorsReducer.authors.length < 1) {
      getAllAuthors();
    }
  }, []);

  // const renderMergedProps = (component, ...rest) => {
  // 	const finalProps = Object.assign({}, ...rest);
  // 	return React.createElement(component, finalProps);
  // };

  // const PropsRoute = ({ component, ...rest }) => (
  // 	<Route
  // 		/* eslint-disable react/jsx-props-no-spreading */
  // 		{...rest}
  // 		render={(routeProps) => renderMergedProps(component, routeProps, rest)}
  // 	/>
  // );

  // PropsRoute.propTypes = {
  // 	component: PropTypes.func.isRequired,
  // };

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <PrivateRoute exact path="/courses" component={Courses} />
          <Route path={["/", "/login"]} exact component={Login} />
          <PrivateRoute exact path="/courses/add" component={CourseForm} />
          <PrivateRoute path="/register" exact component={Registration} />
          <PrivateRoute exact path="/courses/:id" component={CourseInfo} />
          <AdminRoute exact path="/courses/update/:id" component={CourseForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
