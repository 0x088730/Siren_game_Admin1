import axios from 'axios'
export const counterUser = async () => {
    // return (await axios.post(`http://127.0.0.1:8443/api/v1/user/userLP/counterUser`, {})).data;
    return (await axios.post(`https://api.cryptoshowdown.io/api/v1/user/userLP/counterUser`, {})).data;
}