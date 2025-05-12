import PropTypes from 'prop-types';
import './tp.css';
import {useState} from "react";

const Tp = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="tp">
            <button onClick={toggleOpen}>ça déplie</button>
            <h1>{props.titre}</h1>
            <div className={`accordion-header ${isOpen ? 'open' : 'close'}`}>
                <p>{props.description}</p>
            </div>
        </div>
    );
}


Tp.propTypes = {
    titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default Tp;
