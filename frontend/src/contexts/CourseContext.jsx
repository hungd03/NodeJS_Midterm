import { createContext, useReducer, useState } from "react";
import { courseReducer } from "../reducers/courseReducer";
import {
  apiUrl,
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  ADD_NEW_COURSE,
  DELETE_COURSE,
} from "./constants";
import axios from "axios";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  // State
  const [courseState, dispatch] = useReducer(courseReducer, {
    courses: [],
    coursesLoading: true,
  });

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all courses
  const getCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses`);
      if (response.data.success)
        dispatch({
          type: COURSES_LOADED_SUCCESS,
          payload: response.data.courses,
        });
    } catch (error) {
      dispatch({ type: COURSES_LOADED_FAIL });
    }
  };

  // Add New Course
  const addCourse = async (newCourse) => {
    try {
      const response = await axios.post(`${apiUrl}/courses`, newCourse);
      if (response.data.success) {
        dispatch({ type: ADD_NEW_COURSE, payload: response.data.course });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Internal server error" };
    }
  };

  // Detete Course
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(`${apiUrl}/courses/${courseId}`);
      if (response.data.success)
        dispatch({ type: DELETE_COURSE, payload: courseId });
    } catch (error) {
      console.log(error);
    }
  };

  // Course Context data
  const courseContextData = {
    courseState,
    getCourses,
    addCourse,
    deleteCourse,
    showAddCourseModal,
    setShowAddCourseModal,
    showToast,
    setShowToast,
  };

  return (
    <CourseContext.Provider value={courseContextData}>
      {children}
    </CourseContext.Provider>
  );
};
export default CourseContextProvider;
