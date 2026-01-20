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

import {useNavigate} from "react-router-dom";


const CoursPage = () => {
    const { id } = useParams();
    const [cours, setCours] = useState([]);
    const { connected } = useAuth();
    const { CoursNameUpdate } = useUpdate();
    const [reloadKey, setReloadKey] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const dataCours = await getDataWithId('cours', id);
            if (!dataCours || (typeof dataCours === 'object' && Object.keys(dataCours).length === 0)) {
                navigate("404");
            }
            await setCours(dataCours)
        };
        fetchData();
    }, [id, reloadKey]);

    const updateCoursName = async (e) => {
        const newName = e.target.value;
        setCours(prevCours => ({ ...prevCours, nom: newName }));
        CoursNameUpdate(cours.id, newName);
    }

    const handleReload = () => {
        setReloadKey(prevKey => prevKey + 1);
    }


    // Si l'utilisateur est connecté la première partie est affiché en mode édition
    // Sinon la deuxième partie est affiché en mode lecture seule
    return connected ? (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"} style={{backgroundColor: cours?.couleur?.background_color ?? "#FFF"}}>
                    <input
                        className={"coursPage_container_content_header_title"}
                        style={{color: cours?.couleur?.text_color ?? "#000000" }}
                        value={cours.nom ?? ""}
                        onChange={(e) => updateCoursName(e)}
                    />
                </div>
                {cours.tp && <ListeTpEditing id={id} tp={cours.tp}/>}
                <ToolBar reload={handleReload}/>
            </div>
        ) : (
            <div className={"courPage_container_content"}>
                <Header/>
                <div className={"coursPage_container_content_header"} style={{backgroundColor: cours?.couleur?.background_color ?? "#FFF"}}>
                    <h1 className={"coursPage_container_content_header_title"} style={{color: cours?.couleur?.text_color ?? "#000000"}}> {cours.nom} </h1>
                </div>
                    {cours.tp && <ListeTp id={id} tp={cours.tp}/>}
            </div>
        )

}

export default CoursPage;