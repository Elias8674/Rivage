import Tp from "./Tp.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import TableOfContents from "../tableOfContents/TableOfContents.jsx";
import './listeTp.css'
import {getDataWithId, putIndexTp} from "../../services/apiService.js";

const ListeTp = (props) => {
    const [tp, setTp] = useState([]);
    const [filterdTp, setFilteredTp] = useState(tp);
    const [searchTerm, setSearchTerm] = useState("");



    useEffect(() => {
        const fetchTp = async () => {
            const data = await getDataWithId('cours', props.id);
            const sortedTp = data.tp.slice().sort((a, b) => a.index - b.index);
            setTp(sortedTp);
            setFilteredTp(sortedTp);
        }
        fetchTp();
    }, []);


    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredTp(tp.filter(c => c.titre.toLowerCase().includes(value.toLowerCase())));
    };

    const scrollToTp = (id) => {
        const tp = document.getElementById(id);
        console.log('enter to scroll')
        if (tp) {
            tp.scrollIntoView({ behavior: 'smooth' });
            console.log("scroll")
        }
    }


    return (
        <div className={"listeTp_container"}>
            <TableOfContents ListeTp={tp} scrollToTp={scrollToTp} />
            <input className={"SearchBar"}
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