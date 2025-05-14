import PropTypes from "prop-types";

import "./document.css"

const Document = (props) => {

    const Download =  async () => {
        try {
            const url = "http://127.0.0.1:8000/documents/" + props.id;
            const response = await fetch(url);

            if (!response.ok) {
                alert('Erreur lors du téléchargement');
                return;
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = props.nom
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

        } catch (err) {
            console.error('Erreur:', err);
            alert('Erreur lors du téléchargement');
        }

    };

    return (
        <div className="document_container">
            <div className="document_container_content">
                <div className={"document_container_content_icon"}></div>
                <h3 className={"document_container_content_title"}>{props.nom}</h3>
                <button className={"document_container_content_button"} onClick={Download}>Téléchargement</button>
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