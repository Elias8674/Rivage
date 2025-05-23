import PropTypes from 'prop-types';
import './tp.css';
import {useEffect, useState} from "react";
import ListeDocuments from "../document/ListeDocuments.jsx";
import { motion } from "framer-motion";
import {replace} from "react-router-dom";
import PropsTypes from "prop-types";

const TpEditing = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTitle, setIsTitle] = useState('');
    const [isDescription, setIsDescription] = useState('');
    const [error, setError] = useState('');

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        props.open ? setIsOpen(true) : setIsOpen(false);
        setIsTitle(props.titre);
        setIsDescription(props.description);
    }, []);


    const handleAddTp = async (e) => {
        e.preventDefault();
        setError('');

        try {

            const response = await fetch('/api/tp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titre: isTitle,
                    description: isDescription,
                    index: 0,
                    cours_id: props.id,
                }),
                credentials: 'include',
            });

            if (response.status === 200) {
                props.startReload();
                setIsTitle('');
                setIsDescription('');
                return;
            }

        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
        }
    }

    return (
        <form className={"tp_container"} onSubmit={handleAddTp}>
            <div className={"tp_container_header"}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={toggleOpen}
                    className={`tp_container_header_toggle ${isOpen ? 'open' : ''}`}
                    role="button"
                    tabIndex="0"
                    style={{cursor: 'pointer'}}
                >
                    <path d="M24 12L16 20L8 12" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

                </svg>

                <input
                    className={"tp_container_header_title"}
                    type="text"
                    required
                    value={isTitle}
                    placeholder="Titre du TP"
                    onChange={(e) => setIsTitle(e.target.value)}
                />
            </div>

            <motion.div
                className={"tp_container_content"}
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
            >
                <textarea
                    className={"tp_container_content_title"}
                    value={isDescription}
                    rows="3"
                    cols="50"
                    placeholder="Description du TP"
                    onChange={(e) => setIsDescription(e.target.value)}
                />
                <ListeDocuments TpID={props.id} />

                <button className={"tp_container_content_button"} type="submit">
                    Créer
                </button>

            </motion.div>

        </form>
    );
}


TpEditing.propTypes = {
    titre: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    open: PropTypes.bool,
    startReload: PropsTypes.func,
}

export default TpEditing;