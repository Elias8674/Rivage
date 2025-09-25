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
    const [backgroudColor, setBackgroundColor] = useState("#fff");
    const [textColor, setTextColor] = useState("#000");
    const { connected } = useAuth();
    const { CoursNameUpdate } = useUpdate();


    useEffect(() => {
        const fetchData = async () => {
            const dataCours = await getDataWithId('cours', id);
            setCours(dataCours)

            const dataCouleur  = await getDataWithId('couleur', dataCours.couleur_id);
            setBackgroundColor(dataCouleur.background_color);
            setTextColor(dataCouleur.text_color);
        };
        fetchData();
    }, [id]);

    const updateCoursName = async (e) => {
        const newName = e.target.value;
        setCours(prevCours => ({ ...prevCours, nom: newName }));
        CoursNameUpdate(cours.id, newName);
    }


    // Si l'utilisateur est connecté la première partie est affiché en mode édition
    // Sinon la deuxième partie est affiché en mode lecture seule
    return connected ? (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"} style={{backgroundColor: backgroudColor}}>
                    <input
                        className={"coursPage_container_content_header_title"}
                        style={{color: textColor}}
                        value={cours.nom}
                        onChange={(e) => updateCoursName(e)}
                    />
                </div>
                    <ListeTpEditing id={id}/> 
                <ToolBar />
            </div>
        ) : (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"} style={{backgroundColor: backgroudColor}}>
                    <h1 className={"coursPage_container_content_header_title"} style={{color: textColor}}> {cours.nom} </h1>
                </div>
                    <ListeTp id={id}/>
            </div>
        )

}

export default CoursPage;