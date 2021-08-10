import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import { ENDPOINTS } from "./util/consts";
import APIService from "./util/APIService";
import { addCourses } from "./store/courses/actionCreators";
import { addAuthors } from "./store/authors/actionCreators";

function App() {
  const dispatch = useDispatch();
  const appstate = useSelector((state) => state);

  // update this to have an Auth context?
  useEffect(() => {
    // // eslint-disable-next-line no-console
    // console.log(localStorage.getItem('user'));
    if (localStorage.getItem("user") === undefined) {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    if (appstate.coursesReducer.courses.length < 1) {
      APIService.Get(ENDPOINTS.GET_ALL_COURSES).then((courses) => {
        // eslint-disable-next-line no-console
        console.dir(courses);
        dispatch(addCourses(...courses));
      });
    }
  }, [dispatch, appstate.coursesReducer.courses.length]);

  useEffect(() => {
    if (appstate.authorsReducer.authors.length < 1) {
      APIService.Get(ENDPOINTS.GET_ALL_AUTHORS).then((authors) =>
        dispatch(addAuthors(authors))
      );
    }
  }, [dispatch, appstate.authorsReducer.authors.length]);

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
      <div className="App">
        <Header />
        <Switch>
          <PropsRoute exact path="/courses" component={Courses} />
          <Route path={["/", "/login"]} exact component={Login} />
          <PropsRoute exact path="/courses/add" component={CreateCourse} />
          <Route path="/register" exact component={Registration} />
          <PropsRoute exact path="/courses/:id" component={CourseInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
