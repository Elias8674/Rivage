import { useState } from 'react';

const useDownload = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadDocument = async (id, filename) => {
        setIsDownloading(true);

        try {
            const url = `/api/documents/${id}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            return { success: true };
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            return {
                success: false,
                error: error.message || 'Erreur lors du téléchargement'
            };
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        downloadDocument,
        isDownloading
    };
};

export default useDownload;