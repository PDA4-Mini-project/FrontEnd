import axios from 'axios';

const BASE_URL = '/api/gardens';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function getGardenList() {
    const resp = await service.get(`/rooms`);
    return resp.data;
}

export async function createGarden({ _id, time, title, category }) {
    const resp = await service.post(`/rooms`, {
        _id: _id,
        category: category,
        time: time,
        title: title,
    });
    return resp.data;
}
export async function startGarden({ storedRoomId }) {
    const resp = await service.patch(`/start`, {
        roomId: storedRoomId,
    });
    return resp.data;
}

export async function makeRate(user_id, rate) {
    const data = { review_id: user_id, review_score: rate };
    const resp = await service.patch('/end', data);
    return resp;
}
