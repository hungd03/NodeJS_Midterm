export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost/api" // Trong môi trường phát triển, API sẽ gửi đến backend trực tiếp
    : "/api";

export const LOCAL_STORAGE_TOKEN_NAME = "token";

export const COURSES_LOADED_SUCCESS = "COURSES_LOADED_SUCCESS";
export const COURSES_LOADED_FAIL = "COURSES_LOADED_FAIL";
export const ADD_NEW_COURSE = "ADD_NEW_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const FIND_COURSE = "FIND_COURSE";
