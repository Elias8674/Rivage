import PropTypes from 'prop-types';
import './cours.css';

const Cours = (props) => {

    const Redirect = () => {
        window.location.href = "/" + props.id;
    }

    return (
        <div class="cours_cards" onClick={Redirect}>
            <h2 class="cours_cards_title">{props.name}</h2>
        </div>
    )
}

Cours.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default Cours;