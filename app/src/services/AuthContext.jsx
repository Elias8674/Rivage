import {createContext, useContext, useEffect, useState} from "react";
import axios from 'axios';

const APIAUTH = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(()=> {
        const checkAuth = async () => {
            try {
                const response = await APIAUTH.get('/users/me', {
                    withCredentials: true, // Inclut les cookies dans la requête
                });

                if (response.status === 200) {
                    console.log("Utilisateur authentifié");
                    setConnected(true);
                    return true;
                } else {
                    console.log("Utilisateur non authentifié");
                    setConnected(false);
                    return false;
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification :", error);
                return false;
            }
        }
        checkAuth();
  }, []);

  const login = async (username, password) => {
      try {
          setLoading(true);
          const formData = new URLSearchParams();
          formData.append('username', username);
          formData.append('password', password);

          const response = await APIAUTH.post('auth/jwt/login', formData, {
              withCredentials: true,
              validateStatus: () => true
          });

          if (response.status === 204) {
              console.log("Connexion réussie");
              setConnected(true);
              return true;
          } else {
              console.error("Erreur de connexion :", response.data);
              return false;
          }
      } catch (error) {
          console.error('Erreur lors de la connexion :', error);
          throw error;
      } finally {
          setLoading(false);
      }
  };

  const logout = async () => {
    try {
        const response = await APIAUTH.post('auth/jwt/logout', {}, {
            withCredentials: true,
            validateStatus: () => true,
        });
        setConnected(false);
    }
    catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        throw error;
    }
  };

    // Ce qui est partagé dans toute l'app
  const value = {
    login,       // Fonction pour se connecter
    logout,      // Fonction pour se déconnecter
    loading,     // État de chargement
    connected    // Connecté ou non
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

