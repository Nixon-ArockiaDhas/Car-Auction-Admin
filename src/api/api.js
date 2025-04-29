import axios from "axios";

const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const USER_URL = process.env.REACT_APP_USER_URL;
const POSTAL_API = process.env.REACT_APP_POSTAL_API;
const COMMUNITY_URL = process.env.REACT_APP_COMMUNITY_URL;
const SALECALENDAR_URL = process.env.REACT_APP_SALECALENDAR_URL;

export const getTenders = async () => {
        const response = await axios.get('/tenders.json');
        return response.data;
};

export const getUsers = async () => {
        const response = await axios.get(`${USER_URL}`);
        return response.data;
};

export const getSaleCalendar = async () => {
        const response = await axios.get(`${SALECALENDAR_URL}`);
        return response.data;
};

export const getStateList = async () => {
        const response = await axios.get('/states.json');
        return response.data;
};

export const getCommunity = async () => {
        const response = await axios.get(`${COMMUNITY_URL}`);
        return response.data;
};

export const loginApi = async (credentials) => {
        try {
                const response = await axios.post(`${AUTH_URL}/login`, credentials, {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                });
                return response.data;
        } catch (error) {
                throw error;
        }
};

export const fetchSidebarItemsApi = async (token) => {
        try {
                const response = await axios.get(`${AUTH_URL}/sidebar-items`, {
                        headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                        },
                });
                return response.data;
        } catch (error) {
                throw error;
        }
};

export const fetchPostalArea = async(pincode) => {
        const response = await axios.get(`${POSTAL_API}${pincode}`);
        return response.data;
}

export const createUserAPI = async (userDetails) => {
        const response = await axios.post(`${USER_URL}`, userDetails);
        return response.data;
};

export const updateUserAPI = async(userObjectId, userDetails) => {
        const response = await axios.put(`${USER_URL}${userObjectId}`, userDetails);
        return response.data;
};

export const deleteUserAPI = async(id) => {
        const response = await axios.delete(`${USER_URL}${id}`);
        return response.data;
};

export const communityAPI = async(seller_name, state_names) => {
        const response = await axios.post(`${COMMUNITY_URL}sellers`, {seller_name, state_names},{
                headers: {
                        'Content-Type': 'application/json',
                },
        });
        return response.data;
}

export const deleteCommunityAPI = async(id) => {
        const response = await axios.delete(`${COMMUNITY_URL}${id}`);
        return response.data;
}

export const changePasswordAPI = async(id, password) =>{
        const response = await axios.put(`${USER_URL}change-password/${id}`, password);
        return response.data;
}

export const deletSaleCalenderAPI = async(id) =>{
        const response = await axios.delete(`${SALECALENDAR_URL}${id}`);
        return response.data;
}

export const createSaleCalenderAPI = async(saleCalendarData) =>{
        const response = await axios.post(`${SALECALENDAR_URL}`, saleCalendarData);
        return response.data;
}

export const fetchUserCount = async() => {
        const response = await axios.get(`${USER_URL}dashboard/users-summary`);
        return response.data;
}

export const fetchSaleCalendarCount = async() =>{
        const response = await axios.get(`${SALECALENDAR_URL}dashboard/saleCalendar-summary`);
        return response.data;
}