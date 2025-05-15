import PropTypes from 'prop-types';
import './cours.css';

const Cours = (props) => {

    const Redirect = () => {
        window.location.href = "/" + props.id;

    }

    return (
        <div class="cours_cards">
            <div class="cours_cards_footer">
                <h2 class="cours_cards_footer_title">{props.name}</h2>
                <button class="cours_cards_footer_button_ouvrir" onClick={Redirect}>Ouvrir</button>
            </div>
        </div>
    )
}

Cours.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default Cours;