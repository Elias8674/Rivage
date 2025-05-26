import PropTypes from "prop-types";

import "./document.css"
import {downloadDocument} from "../../services/documentService.js";
import useDownload from "../../hooks/useDownload.jsx";

const Document = (props) => {
    const { downloadDocument, isDownloading } = useDownload();

    const handleDownload = async () => {
        const result = await downloadDocument(props.id, props.nom);

        if (!result.success) {
            alert(result.error);
        }
    };


    return (
        <div className="document_container">
            <div className="document_container_content">
                <div className={"document_container_content_icon"}></div>
                <h3 className={"document_container_content_title"}>{props.nom}</h3>
                <button className={"document_container_content_button"} onClick={handleDownload}>Téléchargement</button>
            </div>
            <div className="document_container_footer">
                {props.description && <p className={"document_container_footer_text"}>{props.description}</p>}
            </div>
        </div>
    )
}

Document.propTypes = {
    nom: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
};

export default Document;