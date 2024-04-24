import axios from "axios";
import { getUserDetailsInfo } from "./userDetailsInfo";
const baseUrl = "http://localhost:3002/api/v1/jobs";
const token = getUserDetailsInfo().token;

export const login = (body) =>
  axios.post(`${baseUrl}/login`, body).then(({ data }) => data);

export const signup = (body) =>
  axios.post(`${baseUrl}/signup`, body).then(({ data }) => data);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getJobListing = () =>
  axiosInstance.get(`/listing`).then(({ data }) => data);

export const addJob = (body) =>
  axiosInstance.post(`/addJob`, body).then(({ data }) => data);

export const intrested = (jobId, body) =>
  axiosInstance.post(`/${jobId}/intrested`, body).then(({ data }) => data);
