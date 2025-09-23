import './coursPage.css'
import {data, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cours from "../components/cours/Cours.jsx";
import Tp from "../components/tp/Tp.jsx";
import ListeTp from "../components/tp/ListeTp.jsx";
import './coursPage.css'
import ListeTpEditing from "../components/tp/ListeTpEditing.jsx";
import {getDataWithId} from "../services/apiService.js";
import Header from "../components/header/Header.jsx";
import {useUpdate} from "../services/UpdateContext.jsx";


import {useAuth} from "../services/AuthContext.jsx";
import ToolBar from "../components/toolBar/ToolBar.jsx";

const CoursPage = () => {
    const { id } = useParams();
    const [cours, setCours] = useState([]);
    const { connected } = useAuth();
    const { CoursNameUpdate } = useUpdate();


    useEffect(() => {
        const fetchData = async () => {
            const dataCours = await getDataWithId('cours', id);
            setCours(dataCours)
        };
        fetchData();
    }, []);

    const updateCoursName = async (e) => {
        const newName = e.target.value;
        setCours(prevCours => ({ ...prevCours, nom: newName }));
        CoursNameUpdate(cours.id, newName);
    }

    return connected ? (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"}>
                    <input
                        className={"coursPage_container_content_header_title"}
                        value={cours.nom}
                        onChange={(e) => updateCoursName(e)}
                    />
                </div>
                    <ListeTpEditing id={id}/> :
                <ToolBar />
            </div>
        ) : (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"}>
                    <h1 className={"coursPage_container_content_header_title"}> {cours.nom} </h1>
                </div>
                    <ListeTp id={id}/>
            </div>
        )

}

export default CoursPage;