
import { API_ENDPOINTS } from '@/providers/api/api-config';
import axios from '@/providers/axios/axiosInstance';


export const storeCheckIn = async (login_id:string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.check.checkin, {login_id});
        return response.data;
    } catch (error:any) {
        throw error.response?.data || error.message;
    }
};


export const lastCheckIn = async (login_id:string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.check.lastCheckIn, {login_id});
        return response.data;
    } catch (error:any) {
        throw error.response?.data || error.message;
    }
};



export const storeCheckInOut = async (login_id:string) => {
    try {
        const response = await axios.post(API_ENDPOINTS.check.storeCheckOut, {login_id});
        return response.data;
    } catch (error:any) {
        throw error.response?.data || error.message;
    }
};