import Document from "./Document.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

import "./listeDocuments.css"
import {getDataWithId} from "../../services/apiService.js";
import Dropzone from "./Dropzone.jsx";
import {uploadDocuments} from "../../services/documentService.js";

const ListeDocuments = (props) => {
    const [documents, setDocuments] = useState([]);
    const [reload, setReload] = useState(false);

    // Récupération des documents du TP
    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await getDataWithId('tp', props.TpID);
            setDocuments(data.documents);
        }
        fetchDocuments()
    }, [reload]);

    const handleFiles = async(acceptedFiles) => {
        await uploadDocuments(acceptedFiles[0], props.TpID);
        setReload(!reload);
    };

    return (
        <div className="listeDocuments_container_content">
            {documents.map((document, index) => {
                return (
                    <Document key={index} id={document.id} nom={document.nom} description={document.description} />
                )
            })}
            <Dropzone onFilesDrop={handleFiles}/>

        </div>
    )
}

ListeDocuments.propTypes = {
    TpID: PropTypes.number.isRequired,
}


export default ListeDocuments;