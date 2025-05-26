import axios from 'axios';

const API = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

// Get param
export async function getData(endpoint, parameter) {
    try {
        const response = await API.get(`/${endpoint}/${parameter}`);
        return response.data;
    } catch (error) {
        console.error('Erreur GET :', error);
        throw error;
    }
}

export async function getCours(id) {
    try {
        const response = await API.get(`cours/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur Get Cours :', error);
    }
}

