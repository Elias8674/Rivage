import {useState} from "react";

import "./login.css"
import {login} from "../services/authService.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();
        const reponse = await login(email, password);

        if (reponse) {
            window.location.href = '/home';
        }
    }


    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className={"coursPage_container"}>
            <div className={"coursPage_container_content"}>
                <h1 className={"coursPage_container_content_title"}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={"coursPage_container_content_fields"}>
                        <input
                            className={"coursPage_container_content_fields_input"}
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                        />

                        <input
                            className={"coursPage_container_content_fields_input"}
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <button className={"coursPage_container_content_fields_button"} type="submit">
                        Connexion
                    </button>
                    <button className={"coursPage_container_content_fields_secondaryButton"} onClick={handleBack}>
                        Retour en arrière
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login;