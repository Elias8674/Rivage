import Tp from "./Tp.jsx";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

import './listeTp.css'
import {getDataWithId} from "../../services/apiService.js";

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

const ListeTp = (props) => {
    const [tp, setTp] = useState([]);
    const [filterdTp, setFilteredTp] = useState(tp);
    const [searchTerm, setSearchTerm] = useState("");


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
            const data = await getDataWithId('cours', props.id);
            const sortedTp = data.tp.slice().sort((a, b) => a.index - b.index);
            setTp(sortedTp);
            setFilteredTp(sortedTp);
        }
        fetchTp();
    }, []);


    const updateSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredTp(tp.filter(c => c.titre.toLowerCase().includes(value.toLowerCase())));
    };


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

            // TODO: Ici tu pourras ajouter l'appel API plus tard
        }
    };

    return (
        <div className={"listeTp_container"}>
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
                                <Tp
                                    key={tp.id}
                                    id={tp.id}
                                    titre={tp.titre}
                                    description={tp.description}
                                    isDraggable={true} // Prop pour indiquer que c'est draggable
                                />
                            )
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </div>

    )
}

ListeTp.propTypes = {
    id: PropTypes.number.isRequired,
}


export default ListeTp;