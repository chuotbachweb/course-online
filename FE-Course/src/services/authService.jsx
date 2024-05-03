/* eslint-disable react-refresh/only-export-components */
import { httpRequest } from "~/utils/httprequest";

export const login = (data) => {
  try {
    const res = httpRequest.post("user/login", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const Register = (data) => {
  try {
    const res = httpRequest.post("user/register", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await httpRequest.get("user/current-user", {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTeacher = async ({ page, perPage, fullName }) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.get(`user/get-teacher`, {
      headers: { authorization: "Bearer " + token },
      params: {
        page,
        per_page: perPage,
        fullName,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ page, perPage, fullName }) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.get(`user/get-user`, {
      headers: { authorization: "Bearer " + token },
      params: {
        page,
        per_page: perPage,
        fullName,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async ({ id }) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.get(`user/get-user/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async ({ data, id }) => {
  try {
    const res = await httpRequest.put(`user/edit-user/${id}`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const newTeacher = async ({ data }) => {
  try {
    const res = await httpRequest.post(`user/new-teacher`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async ({ id }) => {
  try {
    const token = localStorage.token;
    const res = await httpRequest.delete(`user/delete-user/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
