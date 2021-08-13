import { ENDPOINTS } from '../../util/consts';
import { deleteCourse, updateCourse, addCourse } from './actionCreators';
import APIService from '../../util/APIService';

export const postDeleteCourse = (id, token) => (dispatch) => {
	APIService.DELETE(ENDPOINTS.DELETE_COURSE_BY_ID, id, token)
		.then((res) => {
			if (res.successful) dispatch(deleteCourse(id));
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('you are not logged in as admin');
		});
};

export const postUpdateCourse = (id, courseData, token) => (dispatch) => {
	APIService.Put(ENDPOINTS.PUT_COURSE_BY_ID, id, courseData, token)
		.then((res) => {
			dispatch(updateCourse(res.result));
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('you are not logged in as admin');
		});
};

export const postAddCourse = (courseData, token) => (dispatch) => {
	APIService.Post(ENDPOINTS.POST_ADD_COURSE, courseData, token)
		.then((res) => {
			dispatch(addCourse(res.result));
		})
		.catch((err) => {
			// eslint-disable-next-line no-alert
			alert('you are not logged in as admin');
		});
};
