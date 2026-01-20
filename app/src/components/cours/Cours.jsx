import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import './cours.css';

const Cours = (props) => {
    const navigate = useNavigate();


    const Redirect = () => {
        navigate(`/cours/${props.id}`, { viewTransition: true});
    }


    return (
        <div className="cours_cards" onClick={Redirect} style={{backgroundColor: props.background_color}}>
            <h2 className="cours_cards_title" style={{ color: props.text_color}}>{props.name}</h2>
        </div>
    )
}

Cours.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    background_color: PropTypes.string.isRequired,
    text_color: PropTypes.string.isRequired,
}

export default Cours;