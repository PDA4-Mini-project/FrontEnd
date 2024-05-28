import axios from 'axios';

const BASE_URL = '/api/users';
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function Signup(name, email, id, password) {
    const res = await service.post('/signup', {
        name: name,
        email: email,
        _id: id,
        password: password,
    });
    return res.data;
}

export async function Login(id, password) {
    const data = { _id: id, password: password };
    const res = await service.post('/login', data);
    return res.data;
}
