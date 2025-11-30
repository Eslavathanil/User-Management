import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Manager {
  manager_id: string;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export const managerApi = {
  getManagers: async () => {
    const response = await api.get("/get_managers");
    return response.data;
  },
};
