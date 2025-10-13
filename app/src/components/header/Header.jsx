import './header.css'
import {useAuth} from "../../services/AuthContext.jsx";

const Header = () => {
    const { connected, logout } = useAuth();
    console.log(connected)


    const Redirect = () => {
        window.location.href = "/login";
    }

    const HandleHome = () => {
        window.location.href = "/home";
    }

    return (
        <div className={"header_container"}>
            <div className={"header_logo"} onClick={HandleHome}>
                <img src={"src/assets/icons/logoRivage.svg"} alt={"logo"}/>
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