import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8443/api/v1/user/',
    baseURL: "https://api.cryptoshowdown.io/api/v1/user/",
});
export const counterUser = async () => {
    const response = await api.post('userLP/counterUser', {});
    return response.data;
}

export const getReferHistory = async (token, transaction) => {
    const response = await api.post('referHistory/', { token, transaction });
    return response.data;
}

export const getWithdrawHistory = async (token) => {
    const response = await api.post('withdrawHistory/', { token });
    return response.data;
}