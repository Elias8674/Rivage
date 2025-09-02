import './header.css'
import {useEffect, useState} from "react";
import {checkAuthStatus} from "../../services/apiService.js";
import {login, logout} from "../../services/authService.js";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(await checkAuthStatus());
        }
        checkAuth();
    }, []);

    const Redirect = () => {
        window.location.href = "/login";
    }

    const Logout = async(e) => {
        e.preventDefault();
        await logout();
        setIsAuthenticated(false);
    }

    return (
        <div className={"header_container"}>
            <div className={"header_logo"}>
                <img src={"src/assets/icons/logoRivage.svg"} alt={"logo"}/>
                <h1 className={"header_logo_title"}>Rivage</h1>
            </div>

            {isAuthenticated ? (
                <div className={"button-rounded"} onClick={Logout}>
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