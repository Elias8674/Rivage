import {useState} from "react";


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

            const response = await fetch('http://127.0.0.1:8000/auth/jwt/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                credentials: 'include', // Important pour les cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Erreur de connexion');
            }
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);

        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />

                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
                <button type="submit">
                    se connecter
                </button>

            </form>
        </div>
    )
}

export default Login;