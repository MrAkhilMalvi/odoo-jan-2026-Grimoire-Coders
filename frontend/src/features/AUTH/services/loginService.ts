import {   ILoginPayload, SignUpFormData } from "@/features/AUTH/types/login";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import axios from "@/providers/axios/axiosInstance";



export const signUp = async (data: SignUpFormData) => {
  const payload = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      payload.append(key, value);
    }
  });

  const response = await axios.post(
    API_ENDPOINTS.login.signup,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const signin = async (payload: ILoginPayload) => {
  try {
    const response = await axios.post(API_ENDPOINTS.login.login, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};



