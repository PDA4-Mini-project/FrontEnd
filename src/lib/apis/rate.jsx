import axios from 'axios';

const BASE_URL = '/api/rates';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function makeRate(user_id, rate) {
    const data = { review_id: user_id, review_score: rate };
    const resp = await service.post(`/`, data);
    return resp;
}
