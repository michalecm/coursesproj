import {
	ADD_COURSE,
	ADD_COURSES,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

const coursesInitialState = {
	courses: [], /// default value - empty array. After success getting courses from API - array of courses.
	// See Swagger `/courses/all`
	isLoading: true,
};

const coursesReducer = (state = coursesInitialState, action) => {
	if (action === undefined) {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case ADD_COURSE:
			return {
				courses: [...state.courses, payload],
				isLoading: false,
			};
		case ADD_COURSES:
			return {
				courses: [...state.courses, ...payload],
				isLoading: false,
			};
		case DELETE_COURSE:
			return {
				courses: [...state.courses].filter((course) => course.id !== payload),
			};
		case UPDATE_COURSE:
			return {
				courses: [...state.courses].map((course) =>
					course.id === payload.id ? payload : course
				),
			};
		default:
			return state;
	}
};

export default coursesReducer;
