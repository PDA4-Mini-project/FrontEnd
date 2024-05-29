import axios from 'axios';

const BASE_URL = '/api/gardens';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function getGardenList() {
    const resp = await service.get(`/rooms`);
    return await resp.data;
}
