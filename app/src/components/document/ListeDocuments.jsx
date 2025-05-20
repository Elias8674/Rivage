import Document from "./Document.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

import "./listeDocuments.css"

const ListeDocuments = (props) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/tp/' + props.TpID ;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des documents");
                }
                const data = await response.json();
                setDocuments(data.documents);

            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="listeDocuments_container_content">
            {documents.map((document, index) => {
                return (
                    <Document key={index} id={document.id} nom={document.nom} description={document.description} />
                )
            })}
        </div>
    )
}

ListeDocuments.propTypes = {
    TpID: PropTypes.number.isRequired,
}


export default ListeDocuments;