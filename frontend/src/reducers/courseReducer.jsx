import {
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  ADD_NEW_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FIND_COURSE,
} from "../contexts/constants";
export const courseReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURSES_LOADED_SUCCESS:
      return {
        ...state,
        courses: payload,
        coursesLoading: false,
      };
    case COURSES_LOADED_FAIL:
      return {
        ...state,
        courses: [],
        coursesLoading: false,
      };
    case ADD_NEW_COURSE:
      return {
        ...state,
        courses: [...state.courses, payload],
      };
    case FIND_COURSE:
      return { ...state, course: payload };
    case UPDATE_COURSE:
      const newCourse = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );
      return {
        ...state,
        courses: newCourse,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== payload),
      };
    default:
      return state;
  }
};
