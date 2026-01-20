import './account.css'

import {deleteMe, getDataCredentials, patchUserMe} from "../services/apiService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../services/AuthContext.jsx";

const Account = () => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataCredentials('users/me');
            await setEmail(data.email);
            await setNom(data.name);
            await setId(data.id);
            console.log(data);
        }
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await patchUserMe( email,  nom);

        console.log('update account success');
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");

        if (confirmed) {
            await deleteMe();
            logout();
            console.log('delete account success');
            navigate('/');
        }

    }

    return (
        <div>
            <h1>Page de compte</h1>

            <h2>Paramètres</h2>

            <div>
                <h3>Vos informations</h3>
                <form onSubmit={handleSubmit}>
                    <p>Email</p>
                    <input
                        id={"email"}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p>Nom</p>
                    <input
                        id={"nom"}
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <button type="submit">Mettre à jour</button>
                </form>
            </div>

            <div>
                <h3>Zone dangereuse</h3>
                <button type="button"
                        onClick={handleDeleteAccount}>
                    Supprimer le compte
                </button>
            </div>
        </div>
    )
}

export default Account;