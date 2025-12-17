import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  user_id: string;
  full_name: string;
  mob_num: string;
  pan_num: string;
  manager_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CreateUserPayload {
  full_name: string;
  mob_num: string;
  pan_num: string;
}

export interface GetUsersPayload {
  user_id?: string;
  mob_num?: string;
  manager_id?: string;
}

export interface DeleteUserPayload {
  user_id?: string;
  mob_num?: string;
}

export interface UpdateUserPayload {
  user_ids: string[];
  update_data: Partial<CreateUserPayload>;
}

export const userApi = {
  createUser: async (data: CreateUserPayload) => {
    const response = await api.post("/create_user", data);
    return response.data;
  },

  getUsers: async (filters?: GetUsersPayload) => {
    const response = await api.post("/get_users", filters || {});
    return response.data;
  },

  deleteUser: async (data: DeleteUserPayload) => {
    const response = await api.post("/delete_user", data);
    return response.data;
  },

  updateUser: async (data: UpdateUserPayload) => {
    const response = await api.post("/update_user", data);
    return response.data;
  },
};
