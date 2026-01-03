import {  SignUpFormData } from "@/features/AUTH/types/login";
import { API_ENDPOINTS } from "@/providers/api/api-config";
import axios from "@/providers/axios/axiosInstance";
import { EmployeeDetails, empUpdate } from "../types";


export const newEmployee = async (payload: EmployeeDetails) => {
  try {
    const response = await axios.post(API_ENDPOINTS.employee.newEmployee, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};


export const employeeList = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.employee.empList);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};


export const employeeProfile = async (login_id: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.employee.empProfile, {login_id});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const employeeUpdate = async (payload: empUpdate) => {
  try {
    const response = await axios.post(API_ENDPOINTS.employee.empUpdate, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const empSalary = async (login_id: string) => {
  try {
    const response = await axios.post(API_ENDPOINTS.employee.empSalary, {login_id});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};