import Tp from "./Tp.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import './listeTp.css'


const ListeTp = (props) => {
    const [tp, setTp] = useState([]);
    const [filterdTp, setFilteredTp] = useState(tp);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/cours/' + props.id ;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération du cours");
                }
                const data = await response.json();
                setTp(data.tp);
                setFilteredTp(data.tp)

            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchData();
    }, []);

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredTp(tp.filter(c => c.titre.toLowerCase().includes(value.toLowerCase())));
    };

    return (
        <div className={"listeTp_container"}>
            <input className={"listeTp_container_search"}
                type="text"
                placeholder="Chercher un tp"
                value={searchTerm}
                onChange={updateSearch}
            />
            <div className={"listeTp_container_content"}>
                {filterdTp.map((tp, index) => {
                    return (
                        <Tp key={index} id={tp.id} titre={tp.titre} description={tp.description} />
                    )
                })}
            </div>

        </div>

    )
}

ListeTp.propTypes = {
    id: PropTypes.number.isRequired,
}


export default ListeTp;