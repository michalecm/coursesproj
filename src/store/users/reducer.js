import { LOGIN, LOGOUT, GET_ROLE } from "./actionTypes";

const userInitialState = {
  isAuth: false, /// default value - false. After success login - true
  name: "", /// default value - empty string. After success login - name of user
  email: "", /// default value - empty string. After success login - email of user
  token: "", /// default value - empty string or token value from localStorage.
  role: "",
  // After success login - value from API /login response. See Swagger.
};

const userReducer = (state = userInitialState, action) => {
  if (action === undefined) {
    return state;
  }

  const { type, payload } = action;
  switch (type) {
    case GET_ROLE:
      return {
        ...state,
        role: payload,
      };
    case LOGIN:
      return {
        isAuth: payload.isAuth,
        name: payload.name,
        email: payload.email,
        token: payload.token,
        role: "",
      };
    case LOGOUT:
      return {
        isAuth: false,
        name: "",
        email: "",
        token: "",
        role: "",
      };
    default:
      return state;
  }
};

export default userReducer;
