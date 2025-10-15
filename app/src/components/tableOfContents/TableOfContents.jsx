
import PropTypes from 'prop-types';
import './tableOfContent.css'

/*
Notre composant TableOfContents reçois en props :
Liste de chapitre, et une fonction pour scroll vers un chapitre

TO DO vérifier si on peut mettre notre fonction de scroll directement dans notre composant
 */
const TableOfContents = (props) => {
    return (
        <div className={"tableOfContents_container"}>
            {props.ListeTp.map((tp, index) => {
                return (
                    <button className={"tableOfContents_container_button"} onClick={()=> {props.scrollToTp(tp.id)}}>{tp.titre}</button>
                )
            })}
        </div>

    )
}

TableOfContents.propTypes = {
    ListeTp: PropTypes.array.isRequired,
    scrollToTp: PropTypes.func.isRequired,
}

export default TableOfContents