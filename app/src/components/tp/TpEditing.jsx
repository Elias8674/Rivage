import PropTypes from 'prop-types';
import './tp.css';
import {useEffect, useState} from "react";
import ListeDocuments from "../document/ListeDocuments.jsx";
import { motion } from "framer-motion";
import {replace} from "react-router-dom";
import PropsTypes from "prop-types";
import {postTp} from "../../services/apiService.js";
import {useUpdate} from "../../services/UpdateContext.jsx";


const TpEditing = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTitle, setIsTitle] = useState(props.titre || '');
    const [isDescription, setIsDescription] = useState(props.description || '');
    const [error, setError] = useState('');
    const { addTpUpdate } = useUpdate();


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

        const resultat = await postTp(isTitle, isDescription, 0, props.id);

        if (resultat === 200) {
            props.startReload();
            setIsTitle('');
            setIsDescription('');
            setError('');
        }
    }

    const update = (e) => {
        addTpUpdate(props.id, e.target.value , isDescription)
    }

    return (
        <div className={"tp_container"}>
            <div className={"tp_container_header"} onClick={toggleOpen}>
                <svg
                    src={'../../assets/icons/chevronUp.svg'}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`tp_container_header_toggle ${isOpen ? 'open' : ''}`}
                    role="button"
                    tabIndex="0"
                    style={{cursor: 'pointer'}}
                >
                    <path d="M24 12L16 20L8 12" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round"
                          stroke-linejoin="round"/>

                </svg>

                <h1 className={"tp_container_header_title"}>{props.titre}</h1>

                <input
                    className={"tp_container_header_title_input"}
                    value={isTitle}
                    onChange={(e) => update(e)}
                />
            </div>


            <motion.div
                className={"tp_container_content"}
                initial={{height: 0, opacity: 0}}
                animate={isOpen ? {height: "auto", opacity: 1} : {height: 0, opacity: 0}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                style={{overflow: "hidden"}}
            >
                <h3 className={"tp_container_content_title"}>{props.description}</h3>
                <ListeDocuments TpID={props.id}/>
            </motion.div>


        </div>
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