import axios from 'axios';

const API = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function checkAuthStatus() {
    try {
        const response = await API.get('/users/me', {
            withCredentials: true, // Inclut les cookies dans la requête
        });

        if (response.status === 200) {
            console.log("Utilisateur authentifié");
            return true;
        } else {
            console.log("Utilisateur non authentifié");
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        return false;
    }
}



// Get param
export async function getData(endpoint) {
    try {
        const response = await API.get(`/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Erreur GET :', error);
        throw error;
    }
}

export async function getDataWithId(endpoint, id) {
    try {
        const response = await API.get(`/${endpoint}/${id}`);
        return (response.data);
    } catch (error) {
        console.error('Erreur GET avec ID :', error);
        throw error;
    }
}

export async function postData(endpoint, data) {
    try {
        const response = await API.post(`/${endpoint}`, data, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        console.error('Erreur POST :', error);
        throw error;
    }
}


export async function getCours(id) {
    try {
        const response = await API.get(`cours/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur Get Cours :', error);
    }
}

export async function postCours(nom, couleur) {
    try {
        const response = await API.post('cours', {
            nom: nom,
            couleur: couleur
        }, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        console.error('Erreur POST Cours :', error);
        throw error;
    }
}

export async function postTp(titre, description, index, idCours) {
    try {
        const response = await API.post('tp', {
            titre: titre,
            description: description,
            index: index,
            cours_id: idCours
        }, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        console.error('Erreur POST Tp :', error);
        throw error;
    }
}