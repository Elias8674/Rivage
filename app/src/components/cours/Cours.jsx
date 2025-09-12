import PropTypes from 'prop-types';
import './cours.css';
import {useEffect, useState} from "react";
import {getData, getDataWithId} from "../../services/apiService.js";

const Cours = (props) => {
    const [backgroudColor, setBackgroundColor] = useState("#fff");
    const [textColor, setTextColor] = useState("#000");


    useEffect(() => {
        const fetchData = async () => {
            const dataCouleur = await getDataWithId('couleur', props.couleur_id);
            setBackgroundColor(dataCouleur.background_color);
            setTextColor(dataCouleur.text_color)
        };
        fetchData();
    }, []);

    const Redirect = () => {
        window.location.href = "/" + props.id;
    }


    return (
        <div class="cours_cards" onClick={Redirect} style={{backgroundColor: backgroudColor}}>
            <h2 class="cours_cards_title" style={{ color: textColor}}>{props.name}</h2>
        </div>
    )
}

Cours.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default Cours;