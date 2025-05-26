import './coursPage.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cours from "../components/cours/Cours.jsx";
import Tp from "../components/tp/Tp.jsx";
import ListeTp from "../components/tp/ListeTp.jsx";

import './coursPage.css'
import ListeTpEditing from "../components/tp/ListeTpEditing.jsx";

import { getCours } from "../services/apiService.js";

const CoursPage = () => {
    const { id } = useParams();
    const [cours, setCours] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifie si l'utilisateur est authentifié
    useEffect(() => {
        const checkAuthStatus = () => {
            const authCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('fusra_session_id='));

            if (authCookie) {
                setIsAuthenticated(true);
                console.log("Utilisateur authentifié");
            }
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        setCours(getCours(id))
    }, []);


    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/cours/' + id ;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération du cours");
                }
                const data = await response.json();
                setCours(data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchData();
    }, []);
     */



    return (
        <div className={"courPage_container_content"}>
            <h1 className={"coursPage_container_content_title"}> {cours.nom } </h1>
            {isAuthenticated ?
                <ListeTpEditing id={id}/> :
                <ListeTp id={id}/>
            }
        </div>

        
    )
}

export default CoursPage;