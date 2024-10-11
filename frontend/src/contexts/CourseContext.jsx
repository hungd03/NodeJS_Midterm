import { createContext, useReducer, useState } from "react";
import { courseReducer } from "../reducers/courseReducer";
import {
  apiUrl,
  COURSES_LOADED_SUCCESS,
  COURSES_LOADED_FAIL,
  ADD_NEW_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FIND_COURSE,
} from "./constants";
import axios from "axios";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  // State
  const [courseState, dispatch] = useReducer(courseReducer, {
    course: null,
    courses: [],
    coursesLoading: true,
  });

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
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

  // Find Course when using update function
  const findCourse = (courseId) => {
    const course = courseState.courses.find(
      (course) => course._id === courseId
    );
    dispatch({ type: FIND_COURSE, payload: course });
  };

  // Update Course
  const updateCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `${apiUrl}/courses/${updatedCourse._id}`,
        updatedCourse
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_COURSE, payload: response.data.course });
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
    findCourse,
    updateCourse,
    deleteCourse,
    showAddCourseModal,
    setShowAddCourseModal,
    showUpdateCourseModal,
    setShowUpdateCourseModal,
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
