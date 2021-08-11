import {
	ADD_COURSE,
	ADD_COURSES,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const addCourse = (course) => ({
	type: ADD_COURSE,
	payload: course,
});

export const addCourses = (courses) => ({
	type: ADD_COURSES,
	payload: courses,
});

export const deleteCourse = (courseId) => ({
	type: DELETE_COURSE,
	payload: courseId,
});

export const updateCourse = (course) => ({
	type: UPDATE_COURSE,
	payload: course,
});
