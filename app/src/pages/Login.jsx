import {useState} from "react";

import "./login.css"
import {useAuth} from "../services/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        const reponse = await login(email, password);

        if (reponse) {
            //window.location.href = '/home';
            navigate(-1);
        } else {
            setError('Email ou mot de passe incorrect');
        }
    }


    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className={"coursPage_container"}>
            <div className={"coursPage_container_content"}>
                <h1 className={"coursPage_container_content_title"}>Connexion à votre compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className={"coursPage_container_content_fields"}>
                        <p className={"coursPage_container_content_fields_text"}>Email</p>
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

                        <p className={"coursPage_container_content_fields_text"}>Mot de passe</p>
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
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}
                    <button className={"coursPage_container_content_fields_button"} type="submit">
                        Connexion
                    </button>
                    <button className={"coursPage_container_content_fields_secondaryButton"} type={"button"} onClick={handleBack}>
                        Retour en arrière
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login;