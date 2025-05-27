import axios from 'axios';

const API = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export async function downloadDocument(documentId, nom) {
    try {
        const reponse = await API.get(`documents/${documentId}`);

        const blob = await reponse.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = nom;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Erreur lors du téléchargement du document :', error);
        alert('Erreur lors du téléchargement du document');
    }
}

export async function uploadDocuments(file, tpId){
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await API.post(`documents/uploadfile/${tpId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du document :', error);
        alert('Erreur lors de l\'envoi du document');
    }
}