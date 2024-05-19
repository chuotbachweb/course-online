/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const submitAssignment = async ({ id, data }) => {
  try {
    const res = await httpRequest.put(`lessons/submit-assignment/${id}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const changeAssignment = async ({ id, data }) => {
  try {
    const res = await httpRequest.put(`lessons/assignment/${id}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    return error;
  }
};
