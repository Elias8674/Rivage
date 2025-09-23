import {createContext, useContext, useEffect, useState} from "react";
import {postDescriptionDocument, putTp} from "./apiService.js";


const UpdateContext = createContext(null);

export const UpdateProvider = ({children}) => {
    const [updateTp, setUpdateTp] = useState(new Map());
    const [updateDocument, setUpdateDocument] = useState(new Map());


    //fonction pour effacer a chaque rechargement de la page
    useEffect(() => {
        return () => {
            setUpdateTp(new Map());
            setUpdateDocument(new Map());
        };
    }, []);

    //fonction pour rajouter un update
    const addTpUpdate = (tpId, titre, description) => {
        setUpdateTp(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(tpId, [titre, description]);
            return newMap;
        });
    }

    const addDocumentUpdate = (documentId, description) => {
        setUpdateDocument(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(documentId, description);
            return newMap;
        });
    }

    //fonction pour envoyé les update à l'api
    //boucle for sur la maps pour envoyer chaque update
    const sendUpdate = async () => {

        for (const [key, value] of updateTp.entries()) {
            const [titre, description] = value;
            await putTp(key, titre, description);
        }

        for (const [key, description] of updateDocument.entries()) {
            await postDescriptionDocument(key, description);
        }


    }

    //fonction pour tout supprimer
    const clearUpdate = () => {
        setUpdateTp(new Map());
        setUpdateDocument(new Map());
    }

    const value = {
        updateTp,
        updateDocument,
        addTpUpdate,
        addDocumentUpdate,
        clearUpdate,
        sendUpdate
    }

    return (
        <UpdateContext.Provider value={value}>
            {children}
        </UpdateContext.Provider>
    );
}

export const useUpdate = () => useContext(UpdateContext);