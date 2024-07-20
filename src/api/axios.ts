import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_URL ?? 'http://164.90.168.22:8001'
});

export default instance