import axios from "axios";
import { config } from "../config";

const API = "api";
const url = `${config.API_HOST}/${API}`;

export function getOneItem(id) {
  return axios.get(`${url}/items/${id}`);
}

export function createItem(data) {
  return axios.post(`${url}/items/create`, data);
}

export function updateItem(id, data) {
  return axios.put(`${url}/items/update/${id}`, data);
}

export function destroyItem(id) {
  return axios.delete(`${url}/items/destroy/${id}`);
}

export function moveItem(id, targetId) {
  return axios.put(`${url}/items/move/${id}`, targetId);
}
