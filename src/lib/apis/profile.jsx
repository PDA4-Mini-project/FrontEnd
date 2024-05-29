import axios from 'axios';

const BASE_URL = '/api/profile';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function GetProfile(id) {
    const res = await service.get(`/${id}`);
    return res.data;
}

export async function EditIntro(content, user_id) {
    const data = { content: content, user_id: user_id };
    console.log(data);
    const res = await service.post('/intro', data);
    return res;
}

export async function EditProfileImage(url) {
    const res = await service.post('/image', url);
    return res.data;
}

export async function EditPorfolioUrl(portfolio_url, user_id) {
    const data = {portfolio_url: portfolio_url, user_id: user_id}
    const res = await service.post('/portfolio', data);
    return res;
}
