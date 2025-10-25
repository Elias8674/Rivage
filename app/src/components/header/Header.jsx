import './header.css'
import {useAuth} from "../../services/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

import logoRivage from "../../assets/icons/logoRivage.svg";

const Header = () => {
    const { connected, logout } = useAuth();
    const navigate = useNavigate();


    const Redirect = () => {
        navigate("/login");
    }

    const HandleHome = () => {
        navigate("/", { viewTransition: true});
    }

    return (
        <div className={"header_container"}>
            <div className={"header_logo"} onClick={HandleHome}>
                <img src={logoRivage} alt={"logo"}/>
                <h1 className={"header_logo_title"}>Rivage</h1>
            </div>

            {connected ? (
                <div className={"button-rounded"} onClick={logout}>
                    <p className={"header_text"}>Déconnexion</p>
                </div>
            ) : (
                <div className={"button-rounded"} onClick={Redirect}>
                    <p className={"header_text"}>Connexion professeur</p>
                </div>
            )}
        </div>
    )
}

export default Header;