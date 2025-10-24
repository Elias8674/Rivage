import Tp from "./Tp.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import './listeTp.css'
import ListeTp from "./ListeTp.jsx";
import TpEditing from "./TpEditing.jsx";
import {deleteData, getDataWithId, putIndexTp} from "../../services/apiService.js";

// Imports @dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
    restrictToParentElement,
    restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import TableOfContents from "../tableOfContents/TableOfContents.jsx";

const ListeTpEditing = (props) => {
    const [tp, setTp] = useState([]);
    const [filterdTp, setFilteredTp] = useState(tp);
    const [searchTerm, setSearchTerm] = useState("");
    const [reload, setReload] = useState(false);

    // Configuration des sensors pour le drag & drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Évite les clics accidentels
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const fetchTp = async () => {
            //const data = await getDataWithId('cours', props.id);
            const sortedTp = props.tp.slice().sort((a, b) => a.index - b.index);
            setTp(sortedTp);
            setFilteredTp(sortedTp);
        }
        fetchTp();
        setReload(false);
    }, [reload]);


    const handleReload = () => {
        setReload(true);
    }

    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredTp(tp.filter(c => c.titre.toLowerCase().includes(value.toLowerCase())));
    };

    const mouveTp = async (id, index) => {
        await putIndexTp(id, index);
    }

    // Fonction appelée à la fin du drag
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            return; // Pas de destination valide
        }

        if (active.id !== over.id) {
            setFilteredTp((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                // arrayMove réorganise le tableau
                const newItems = arrayMove(items, oldIndex, newIndex);

                // Si pas de recherche active, met à jour aussi tp principal
                if (!searchTerm) {
                    setTp(newItems);
                }

                return newItems;
            });

            const tp1 = filterdTp.find(item => item.id === active.id);
            const tp2 = filterdTp.find(item => item.id === over.id);
            mouveTp(tp1.id, tp2.index)

        }
    };

    const handleDeleteTp = async (id) => {
        const previousListTp = tp
        setTp(tp.filter(tp => tp.id !== id));
        setFilteredTp(tp.filter(tp => tp.id !== id))

        try {
            await deleteData('tp', id);
        } catch (error) {
            setTp(previousListTp);
            setFilteredTp(previousListTp);
        }


    }

    const scrollToTp = (id) => {
        const tp = document.getElementById(id);
        console.log('enter to scroll')
        if (tp) {
            tp.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={"listeTp_container"}>
            <TableOfContents ListeTp={tp} scrollToTp={scrollToTp} />

            <input className={"SearchBar"}
                   type="text"
                   placeholder="Chercher un tp"
                   value={searchTerm}
                   onChange={updateSearch}
            />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={filterdTp.map(tp => tp.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={"listeTp_container_content"}>
                        {filterdTp.map((tp) => {
                            return (
                                <TpEditing
                                    key={tp.id}
                                    id={tp.id}
                                    titre={tp.titre}
                                    description={tp.description}
                                    isDraggable={true}
                                    handleDeleteTp={handleDeleteTp}
                                />
                            )
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

    /*
    return (
        <div className={"listeTp_container"}>
            <input className={"SearchBar"}
                   type="text"
                   placeholder="Chercher un tp"
                   value={searchTerm}
                   onChange={updateSearch}
            />
            <div className={"listeTp_container_content"}>
                {filterdTp.map((tp, index) => {
                    return (
                        <TpEditing key={index} id={tp.id} titre={tp.titre} description={tp.description} />
                    )
                })}
                <TpEditing open={true} id={props.id} startReload={handleReload} />
            </div>

        </div>

    )

     */



ListeTp.propTypes = {
    id: PropTypes.number.isRequired,
    tp: PropTypes.array.isRequired,
}

export default ListeTpEditing;