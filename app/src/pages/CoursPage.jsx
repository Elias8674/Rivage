import './coursPage.css'
import {data, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cours from "../components/cours/Cours.jsx";
import Tp from "../components/tp/Tp.jsx";
import ListeTp from "../components/tp/ListeTp.jsx";
import './coursPage.css'
import ListeTpEditing from "../components/tp/ListeTpEditing.jsx";
import {checkAuthStatus, getCours, getDataWithId} from "../services/apiService.js";
import Header from "../components/header/Header.jsx";


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
        const fetchData = async () => {
            const dataCours = await getDataWithId('cours', id);
            setCours(dataCours)
        };
        fetchData();
    }, []);



    return (
        <div className={"courPage_container_content"}>
            <Header/>
            <div className={"coursPage_container_content_header"}>
                <h1 className={"coursPage_container_content_header_title"}> {cours.nom} </h1>
            </div>
            {isAuthenticated ?
                <ListeTpEditing id={id}/> :
                <ListeTp id={id}/>
            }
        </div>


    )
}

export default CoursPage;