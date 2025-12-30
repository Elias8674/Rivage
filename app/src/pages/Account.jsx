import './account.css'

import {deleteData, getDataCredentials, patchUserMe} from "../services/apiService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Account = () => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

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

        await deleteData('users', id);

        console.log('delete account success');

        navigate();
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
                <button>Supprimer le compte</button>
            </div>
        </div>
    )
}

export default Account;