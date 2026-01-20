import PropTypes from 'prop-types';
import './tp.css';
import {useEffect, useState} from "react";
import ListeDocuments from "../document/ListeDocuments.jsx";
import { motion } from "framer-motion";
import {replace} from "react-router-dom";
import PropsTypes from "prop-types";
import {deleteData, postTp} from "../../services/apiService.js";
import {useUpdate} from "../../services/UpdateContext.jsx";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import dragHandle from '../../assets/icons/drag-handle.svg';



const TpEditing = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTitle, setIsTitle] = useState(props.titre || '');
    const [isDescription, setIsDescription] = useState(props.description || '');
    const [error, setError] = useState('');
    const { addTpUpdate } = useUpdate();

    const sortable = useSortable({id: props.id});
    const { attributes, listeners, setNodeRef, transform, transition, isDragging,} = sortable;

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1, // Feedback visuel pendant le drag
        };



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

    const updateTitleTp = (e) => {
        const value = e.target.value;
        setIsTitle(value);
        addTpUpdate(props.id, value , isDescription)
    }

    const updateDescriptionTp = (e) => {
        const value = e.target.value;
        setIsDescription(value);
        addTpUpdate(props.id, isTitle , value)
    }


    return (
        <div
            id={props.id}
            className={"tp_container"}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
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
                    <path d="M24 12L16 20L8 12" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round"
                          strokeLinejoin="round"/>

                </svg>

                <input
                    className={"tp_container_header_title"}
                    placeholder={"Nom du TP"}
                    value={isTitle}
                    onChange={(e) => updateTitleTp(e)}
                />

                <button className={"tp_container_header_delete"} onClick={() => props.handleDeleteTp(props.id)}>Supprimer</button>

                <img
                    className={"tp_container_header_dragHandle"}
                    src={dragHandle}
                    alt="Edit"
                    {...listeners}
                />
            </div>


            <motion.div
                className={"tp_container_content"}
                initial={{height: 0, opacity: 0, paddingBottom: 0}}
                animate={isOpen ? {height: "auto", opacity: 1, paddingBottom: 22} : {height: 0, opacity: 0}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                style={{overflow: "hidden"}}
            >
                <input
                    className={"tp_container_content_title"}
                    placeholder={"Description du TP"}
                    value={isDescription}
                    onChange={(e) => updateDescriptionTp(e)}
                />
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
    handleDeleteTp: PropsTypes.func,
}

export default TpEditing;