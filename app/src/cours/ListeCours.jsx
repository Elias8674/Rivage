import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";
import {useEffect, useState} from "react";

const ListeCours = () => {
    const [cours, setCours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://backend:8000/cours/');
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des cours");
                }
                const data = await response.json();
                setCours(data); // Met à jour l'état avec les données résolues
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchData();
    }, []);



    return (
        <div>
            <h1>Liste Cours</h1>
            {cours.map((cours, index) => {
                return (
                    <Cours index={index} id={cours.id} name={cours.name} />
                )
            })}
        </div>
    )
}

export default ListeCours;