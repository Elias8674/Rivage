import './coursPage.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cours from "../components/cours/Cours.jsx";
import Tp from "../components/tp/Tp.jsx";
import ListeTp from "../components/tp/ListeTp.jsx";

const CoursPage = () => {
    const { id } = useParams();

    const [cours, setCours] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://127.0.0.1:8000/cours/' + id ;
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


    return (
        <div>
            <p>OK</p>
            <h1> {cours.nom } </h1>
            <p> {cours.description} </p>

            <ListeTp id={id} />
        </div>

    )
}

export default CoursPage;