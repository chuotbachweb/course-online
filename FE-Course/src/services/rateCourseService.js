/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const sentRate = async ({ courseId, data }) => {
  try {
    const res = await httpRequest.post(
      `rate-course/sent-rate/${courseId}`,
      data,
      {
        headers: { authorization: "Bearer " + localStorage.token },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getRate = async ({ courseId }) => {
  try {
    const res = await httpRequest.get(
      `rate-course/get-rate-course/${courseId}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};