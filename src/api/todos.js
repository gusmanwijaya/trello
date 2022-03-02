import axios from "axios";
import { config } from "../config";

const API = "api";
const url = `${config.API_HOST}/${API}`;

export function getTodos() {
  return axios.get(`${url}/todos`);
}

export function createTodo(data) {
  return axios.post(`${url}/todos/create`, data);
}

export function getOneTodo(id) {
  return axios.get(`${url}/todos/${id}`);
}

export function updateTodo(id, data) {
  return axios.put(`${url}/todos/update/${id}`, data);
}

export function destroyTodo(id) {
  return axios.delete(`${url}/todos/destroy/${id}`);
}
