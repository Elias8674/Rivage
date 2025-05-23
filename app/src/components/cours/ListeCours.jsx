import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";
import {useEffect, useState} from "react";

import './listeCours.css'

const ListeCours = () => {
    const [cours, setCours] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCours, setFilteredCours] = useState(cours);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNameCours, setIsNameCours] = useState('');
    const [error, setError] = useState('');


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
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cours');
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

    const handleAddCours = async (e) => {
        e.preventDefault();
        setError('');

        try {

            const response = await fetch('/api/cours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: isNameCours,
                    couleur: "string"
                }),
                credentials: 'include',
            });

            if (response.status === 200) {
                // Redirection réussie
                window.location.href = '/home'; // a modif
                return;
            }

        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
        }
    }


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
                {isAuthenticated && (
                    <div class="listeCours_container_authenticated_coursadd">
                        <form className="listeCours_container_authenticated_coursadd_footer" onSubmit={handleAddCours}>
                            <input
                                className={"listeCours_container_authenticated_coursadd_footer_title"}
                                id="coursName"
                                name="coursName"
                                type="text"
                                required
                                onChange={e => setIsNameCours(e.target.value)}
                                placeholder="Nom du cours"
                            />
                            <button className="listeCours_container_authenticated_coursadd_footer_button" type={"submit"}>
                                Créer
                            </button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ListeCours;