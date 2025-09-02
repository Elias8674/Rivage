import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";
import {use, useEffect, useState} from "react";

import './listeCours.css'
import {checkAuthStatus, getData, postCours} from "../../services/apiService.js";

const ListeCours = () => {
    const [cours, setCours] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCours, setFilteredCours] = useState(cours);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNameCours, setIsNameCours] = useState('');

    const [reload, setReload] = useState(false);


    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(await checkAuthStatus());
        }
        checkAuth();
    },[]);


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

    const handleAddCours = async (e) => {
        e.preventDefault();
        setError('');

        await postCours(isNameCours, "string");
        setReload(!reload);
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
                {filteredCours.map((cours, index) => {
                    return (
                        <Cours index={index} id={cours.id} name={cours.nom}/>
                    )
                    })}
                {isAuthenticated && (
                    <form className="listeCours_container_authenticated_coursadd" onClick={handleAddCours} >
                        <input
                            className={"listeCours_container_authenticated_coursadd_footer_title"}
                            id="coursName"
                            name="coursName"
                            type="text"
                            required
                            onChange={e => setIsNameCours(e.target.value)}
                            placeholder="Nom du cours"
                        />
                    </form>
                )}

            </div>
        </div>
    )
}

export default ListeCours;