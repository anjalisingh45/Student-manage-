import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/students`;

export const addStudentAPI = (data) => {
  return axios.post(API, data);
};

export const updateStudentAPI = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const getStudentsAPI = () => axios.get(API);

export const deleteStudentAPI = (id) => axios.delete(`${API}/${id}`)