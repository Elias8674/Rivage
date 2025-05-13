import PropTypes from "prop-types";

import "./document.css"

const Document = (props) => {
    return (
        <div className="document_container">
            <div className="document_container_content">
                <div className={"document_container_content_icon"}></div>
                <h3 className={"document_container_content_title"}>{props.nom}</h3>
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
};

export default Document;