import { httpRequest } from "~/utils/httprequest";

export const buyCourse = async ({ courseId }) => {
  try {
    const res = await httpRequest.get(`my-course/buy-course/${courseId}`, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMyCourse = async ({ page, perPage }) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.get(`my-course/get-my-course`, {
      headers: { authorization: "Bearer " + token },
      params: {
        page,
        per_page: perPage,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const trackingProgress = async ({lessonId,courseId}) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.put(
      `my-course/tracking-progress`,
      {
        lessonId,
        courseId,
      },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
