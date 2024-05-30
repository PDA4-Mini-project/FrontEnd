import axios from 'axios';

const BASE_URL = '/api/profile';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function GetProfile(id) {
    const res = await service.get(`/${id}`);
    return res.data;
}
