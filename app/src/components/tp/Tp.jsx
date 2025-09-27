import PropTypes from 'prop-types';
import './tp.css';
import {useState} from "react";
import ListeDocuments from "../document/ListeDocuments.jsx";
import { motion } from "framer-motion";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import dragHandle from '../../assets/icons/drag-handle.svg';

const Tp = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const sortable = useSortable({id: props.id});
    const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = sortable;

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1, // Feedback visuel pendant le drag
        };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div
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
                    <path d="M24 12L16 20L8 12" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

                </svg>

                <h1 className={"tp_container_header_title"}>{props.titre}</h1>

                <img
                    className={"tp_container_header_dragHandle"}
                    src={dragHandle}
                    alt="Edit"
                    {...listeners}
                />
            </div>



            <motion.div
                className={"tp_container_content"}
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
            >
                <h3 className={"tp_container_content_title"}>{props.description}</h3>
                <ListeDocuments TpID={props.id} />
            </motion.div>



        </div>
    );
}


Tp.propTypes = {
    titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default Tp;
