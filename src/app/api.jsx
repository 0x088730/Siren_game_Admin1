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

export const getDepositHistory = async (token) => {
    const response = await api.post('getDepositHistory/', { token });
    return response.data;
}

export const getWithdrawHistory = async (token) => {
    const response = await api.post('getWithdrawHistory/', { token });
    return response.data;
}

export const setWithdrawConfirm = async (token, withdraw) => {
    const response = await api.post('setWithdrawConfirm/', { token, withdraw });
    return response.data;
}

export const getUSDTWithdrawHistory = async (token) => {
    const response = await api.post('getUSDTWithdrawHistory/', { token });
    return response.data;
}

export const getCSCWithdrawHistory = async (token) => {
    const response = await api.post('getCSCWithdrawHistory/', { token });
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

export const getAllReward = async (token) => {
    const response = await api.post('getAllReward/', { token });
    return response.data;
}

export const getLoginsHistory = async (token) => {
    const response = await api.post('getLoginsHistory/', { token });
    return response.data;
}

export const getBonusHistory = async (token) => {
    const response = await api.post('getBonusHistory/', { token });
    return response.data;
}