import {createContext, useContext, useEffect, useState} from "react";

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

    const addDocumentUpdate = (documentId, nom, description) => {
        setUpdateDocument(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(documentId, [nom, description]);
            return newMap;
        });
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
        clearUpdate
    }

    return (
        <UpdateContext.Provider value={value}>
            {children}
        </UpdateContext.Provider>
    );
}

export const useUpdate = () => useContext(UpdateContext);