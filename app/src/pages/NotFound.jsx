import './notFound.css'
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={"notFound_container"}>
            <h1 className={"notFound_container_title"}>404 Page introuvable</h1>
            <button
                className={"notFound_container_button"}
                onClick={() => navigate('/')}
            >Retour à l’accueil</button>
        </div>
    )
}

export default NotFound;