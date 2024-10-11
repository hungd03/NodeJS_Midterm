import {
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  ADD_NEW_COURSE,
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
    default:
      return state;
  }
};
