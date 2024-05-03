/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const getLessonByCourse = ({ courseId }) => {
  try {
    const res = httpRequest.get(`lessons/course/${courseId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLessonById = async ({ id }) => {
  try {
    const res = await httpRequest.get(`lessons/get-lesson/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const addLesson = ({ courseId, data }) => {
  try {
    const res = httpRequest.post(`lessons/add-lesson/${courseId}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editLesson = ({ courseId, data }) => {
  try {
    const res = httpRequest.put(`lessons/edit-lesson/${courseId}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLesson = ({ courseId }) => {
  try {
    const res = httpRequest.delete(`lessons/delete-lesson/${courseId}`, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
