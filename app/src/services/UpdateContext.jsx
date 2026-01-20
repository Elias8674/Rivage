import {createContext, useContext, useEffect, useState} from "react";
import {postDescriptionDocument, putCoursName, putTp} from "./apiService.js";


const UpdateContext = createContext(null);

export const UpdateProvider = ({children}) => {
    const [updateTp, setUpdateTp] = useState(new Map());
    const [updateDocument, setUpdateDocument] = useState(new Map());
    const [updateNameCours, setUpdateNameCours] = useState(new Map());


    //fonction pour effacer a chaque rechargement de la page
    useEffect(() => {
        return () => {
            setUpdateTp(new Map());
            setUpdateDocument(new Map());
            setUpdateNameCours(new Map());
        };
    }, []);


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

    const CoursNameUpdate = (coursId, coursName) => {
        setUpdateNameCours(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(coursId, coursName);
            return newMap;
        })
    }


    //fonction pour envoyer les modifications à l'api
    const sendUpdate = async () => {

        for (const [key, value] of updateTp.entries()) {
            const [titre, description] = value;
            await putTp(key, titre, description);
        }

        for (const [key, description] of updateDocument.entries()) {
            await postDescriptionDocument(key, description);
        }

        for (const [key, CoursName] of updateNameCours.entries()) {
            await putCoursName(key, CoursName);
        }

        clearUpdate();
    }

    //fonction pour tout supprimer
    const clearUpdate = () => {
        setUpdateTp(new Map());
        setUpdateDocument(new Map());
        setUpdateNameCours(new Map());
    }

    //fonction pour vérifier si il y'a des modifications
    const hasUpdate = () => {
        return updateTp.size > 0 || updateDocument.size > 0 || updateNameCours.size > 0;
    }

    const value = {
        updateTp,
        updateDocument,
        addTpUpdate,
        addDocumentUpdate,
        CoursNameUpdate,
        clearUpdate,
        sendUpdate,
        hasUpdate,
    }

    return (
        <UpdateContext.Provider value={value}>
            {children}
        </UpdateContext.Provider>
    );
}

export const useUpdate = () => useContext(UpdateContext);