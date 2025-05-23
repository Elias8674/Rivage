import {useState} from "react";

import "./login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new URLSearchParams();
        formData.append('username', email); // le backend attend 'username'
        formData.append('password', password);

        try {

            const response = await fetch('/api/auth/jwt/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include', // Important pour les cookies
            });

            // Si l'authentification réussit (statut 204)
            if (response.status === 204) {
                // Redirection réussie
                window.location.href = '/home';
                return;
            }

            // Pour les autres codes de statut, tenter de parser le JSON
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Erreur de connexion');
            }

            window.location.href = '/home';
        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
        }
    };

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