import PropTypes from "prop-types";

import "./document.css"
import {downloadDocument} from "../../services/documentService.js";
import useDownload from "../../hooks/useDownload.jsx";
import {useEffect, useState} from "react";
import {checkAuthStatus, deleteData} from "../../services/apiService.js";

const Document = (props) => {
    const { downloadDocument, isDownloading } = useDownload();
    const [isDescription, setIsDescription] = useState(props.description || '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(await checkAuthStatus());
        }
        checkAuth();
    },[]);

    const handleDownload = async () => {
        const result = await downloadDocument(props.id, props.nom);

        if (!result.success) {
            alert(result.error);
        }
    };

    const handleDelete = async () => {
        // Ajouter éventuellement une confirmation
        if (window.confirm("Voulez-vous vraiment supprimer ce document ?")) {
            try {
                await deleteData('documents', props.id);
                props.reload();

            } catch (error) {
                alert("Erreur lors de la suppression: " + error.message);
            }
        }
    };


    return (
        <div className="document_container">
            <div className="document_container_content">
                <div className={"document_container_content_icon"}></div>
                <h3 className={"document_container_content_title"}>{props.nom}</h3>

                <div className={"document_container_content_buttons"}>
                    {isAuthenticated && (
                        <button className="button-delete" onClick={handleDelete}>Supprimer</button>
                    )}
                    <button className="button" onClick={handleDownload}>Téléchargement</button>
                </div>
            </div>

            {isAuthenticated ? (
                <form className="document_container_footer">
                    <input
                        className={"document_container_footer_text"}
                        value={isDescription}
                        placeholder="Description du document"
                        onChange={(e) => setIsDescription(e.target.value)}
                    />
                </form>
            ) : (
                <div className="document_container_footer">
                    {props.description && <p className={"document_container_footer_text"}>{props.description}</p>}
                </div>
            )}

        </div>
    )
}

Document.propTypes = {
    nom: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    reload: PropTypes.func,
};

export default Document;