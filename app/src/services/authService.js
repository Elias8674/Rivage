import axios from 'axios';

const APIAUTH = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})


export async function login(username, password) {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await APIAUTH.post('auth/jwt/login', formData, {
            withCredentials: true,
            validateStatus: () => true
        });

        if (response.status === 204) {
            console.log("Connexion réussie");
            return true;
        } else {
            console.error("Erreur de connexion :", response.data);
            return false;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await APIAUTH.post('auth/jwt/logout', {}, {
            withCredentials: true,
            validateStatus: () => true
        });
    }
    catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        throw error;
    }
}
