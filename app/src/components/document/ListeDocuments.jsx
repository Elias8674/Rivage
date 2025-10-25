import Document from "./Document.jsx";
import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from "react";

import "./listeDocuments.css"
import {getDataWithId} from "../../services/apiService.js";
import Dropzone from "./Dropzone.jsx";
import {uploadDocuments} from "../../services/documentService.js";

import { useDropzone } from "react-dropzone";
import {useAuth} from "../../services/AuthContext.jsx";

const ListeDocuments = (props) => {
    const [documents, setDocuments] = useState([]);
    const [reload, setReload] = useState(false);
    const { connected } = useAuth();


    // Récupération des documents du TP
    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await getDataWithId('tp', props.TpID);
            setDocuments(data.documents);
        }
        fetchDocuments()
        setReload(false);
    }, [reload]);

    /*
    const handleFiles = async(acceptedFiles) => {
        await uploadDocuments(acceptedFiles[0], props.TpID);
        handleReload();
    };
     */

    const handleReload = () => {
        setReload(!reload);
    }

    const onDrop = useCallback(async(acceptedFiles) => {
        if (acceptedFiles.length === 0) return;


        try {
          // Appel de votre fonction d'upload
          const result = await uploadDocuments(acceptedFiles[0], props.TpID);
          //console.log('Upload réussi:', result);
        } catch (error) {
          console.error('Erreur upload:', error);
        }
        acceptedFiles[0] = null;
        setReload(true);
    }, []);



    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: false, });

    return (
        <div className="listeDocuments_container">
            <div className="listeDocuments_container_content">
                        {documents.map((document, index) => {
                            return (
                                <Document key={index} id={document.id} nom={document.nom} description={document.description} reload={handleReload} />
                            )
                        })}
                    </div>
            { connected &&
                <div className={"listeDocuments_container_dropzone"} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className={"listeDocuments_container_dropzone_text"}>Glisser et déposez un document</p>

                </div> }
        </div>

    )
}

ListeDocuments.propTypes = {
    TpID: PropTypes.number.isRequired,
}


export default ListeDocuments;