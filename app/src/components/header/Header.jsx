import './header.css'
import {useAuth} from "../../services/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

import logoRivage from "../../assets/icons/logoRivage.svg";
import logoParametre from "../../assets/icons/parametre.svg";

import account from "../../pages/Account.jsx";


const Header = () => {
    const { connected, logout } = useAuth();
    const navigate = useNavigate();


    const Redirect = () => {
        navigate("/login", { viewTransition: true});
    }

    const RedirectToAccount = () => {
        navigate("/account", { viewTransition: true});
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
                <div className={"header_buttons"}>
                    <div className={"button-rounded"} onClick={logout}>
                        <p className={"header_text"}>Déconnexion</p>
                    </div>
                    <div className={"button-rounded"} onClick={RedirectToAccount}>
                        <img src={logoParametre} alt={"logo"} className={"header_parametre"}></img>
                    </div>
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