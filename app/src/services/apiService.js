import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'Content-Type': 'application/json' }
});


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

export async function deleteData(endpoint, id) {
    try {
        const response = await API.delete(`/${endpoint}/${id}`, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        console.error('Erreur DELETE :', error);
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

export async function putTp(id, titre, description) {
    try {
        const response = await API.put(`tp/${id}`, {
            titre: titre,
            description: description
        }, {
            withCredentials: true,
        });
        return response.status;
    } catch (error) {
        console.error('Erreur PUT Tp :', error);
        throw error;
    }
}

export async function postDescriptionDocument(id, description) {
    try {
        const response = await API.post(`documents/${id}?description=${encodeURIComponent(description)}`, {}, {
            withCredentials: true,
        });
    } catch (error) {
        console.error('Erreur POST Description Document :', error);
        throw error;
    }
}

export async function putCoursName(id, coursName) {
    try {
        const response = await API.patch(`cours/${id}`, {
            nom: coursName
        }, {
            withCredentials: true,
        });
    } catch (error) {
        console.error('Erreur PUT Cours Name :', error);
        throw error;
    }
}