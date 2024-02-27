import axios from 'axios'
import config from './config';

const api = axios.create({
    baseURL: `${config.server}${config.baseURL}/user/`,
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

export const getItems = async (walletAddress, accessToken) => {
    const response = await api.post('getItems/', { walletAddress, accessToken });
    return response.data;
}

export const getRewardList = async (token) => {
    const response = await api.post('getRewardList/', { token });
    return response.data;
}