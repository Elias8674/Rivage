import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";
import {useEffect, useState} from "react";

import './listeCours.css'

const ListeCours = () => {
    const [cours, setCours] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCours, setFilteredCours] = useState(cours);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/cours/');
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des cours");
                }
                const data = await response.json();
                setCours(data); // Met à jour l'état avec les données résolues
                setFilteredCours(data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchData();
    }, []);

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredCours(cours.filter(c => c.nom.toLowerCase().includes(value.toLowerCase())));
    };


    return (
        <div class='listeCours_container'>
            <input className='listeCours_container_Search'
                   type="text"
                   placeholder="Chercher un cours"
                   value={searchTerm}
                   onChange={updateSearch}
            />

            <div class='listeCours_container_content'>
                {filteredCours.map((cours, index) => {
                    return (
                        <Cours index={index} id={cours.id} name={cours.nom}/>
                    )
                    })}
            </div>
        </div>
    )
}

export default ListeCours;