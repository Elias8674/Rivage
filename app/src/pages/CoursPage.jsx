import './coursPage.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cours from "../components/cours/Cours.jsx";
import Tp from "../components/tp/Tp.jsx";
import ListeTp from "../components/tp/ListeTp.jsx";

import './coursPage.css'
import ListeTpEditing from "../components/tp/ListeTpEditing.jsx";

import {checkAuthStatus, getCours} from "../services/apiService.js";

const CoursPage = () => {
    const { id } = useParams();
    const [cours, setCours] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // Vérifie si l'utilisateur est authentifié
    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(await checkAuthStatus());
        }
        checkAuth();
    },[]);

    useEffect(() => {
        setCours(getCours(id))
    }, []);


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