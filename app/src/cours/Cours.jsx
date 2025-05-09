import PropTypes from 'prop-types';

const Cours = (props) => {

    const Redirect = () => {
        window.location.href = "/" + props.id;
    }

    return (
        <div>
            <h2>{props.name}</h2>
            <button onClick={Redirect}>Ouvrir</button>
        </div>
    )
}

Cours.propTypes = {
    name: PropTypes.string.isRequire,
    id: PropTypes.number.isRequire,
}

export default Cours;