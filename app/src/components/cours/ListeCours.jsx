import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";
import './listeCours.css'

import {useEffect, useState} from "react";
import {getData, postCours} from "../../services/apiService.js";
import {useAuth} from "../../services/AuthContext.jsx";

const ListeCours = () => {
    const [cours, setCours] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCours, setFilteredCours] = useState(cours);
    const [isNameCours, setIsNameCours] = useState('');
    const [reload, setReload] = useState(false);

    const { connected } = useAuth();


    useEffect(() => {
        const fetchData = async () => {
            const dataCours = await getData('cours');
            setCours(dataCours);
            setFilteredCours(dataCours);
            console.log("data cours", dataCours);
        };
        fetchData();
    }, [reload]);

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredCours(cours.filter(c => c.nom.toLowerCase().includes(value.toLowerCase())));
    };

    const handleAddCours = async () => {
        const dataCours = await postCours("Aucun nom");
        window.location.href = "/" + dataCours.id;
        //setReload(!reload);
    }


    return (
        <div className='listeCours_container'>
            <input
                className='SearchBar'
                type="text"
                placeholder="Chercher un cours"
                value={searchTerm}
                onChange={updateSearch}
            />

            <div className='listeCours_container_content'>
                {connected && (
                    <div className={"listeCours_container_authenticated_coursadd"} onClick={handleAddCours}>
                        <h3 className={"listeCours_container_authenticated_coursadd_title"}>Nouveau cours</h3>
                    </div>
                )}
                {filteredCours.map((cours, index) => {
                    return (
                        <Cours index={index} id={cours.id} name={cours.nom} couleur_id={cours.couleur_id}/>
                    )
                    })}
            </div>
        </div>
    )
}

export default ListeCours;