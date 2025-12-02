import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

import {AuthProvider} from "./services/AuthContext.jsx";
import {UpdateProvider} from "./services/UpdateContext.jsx";

import { Routes, Route, Link } from 'react-router-dom'


import './index.css'
import "./assets/font.css"
import Home from "./pages/Home.jsx";
import CoursPage from "./pages/CoursPage.jsx";
import Login from "./pages/Login.jsx";

import './Ui/variables.css'
import "./Ui/search.css"
import "./Ui/button.css"
import NotFound from "./pages/NotFound.jsx";
import Account from "./pages/Account.jsx";



// Layout racine pour les routes
const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// Configuration du router
const router = createBrowserRouter([
  {
    path: "/",             // Route principale
    element: <RootLayout />, // Le layout racine contenant l'Outlet
    children: [
      { index: true, element: <Home /> },       // correspond à "/"
      { path: "cours/:id", element: <CoursPage /> },  // correspond à "/123"
      { path: "login", element: <Login /> },    // correspond à "/login"
      { path: "account", element: <Account /> },
      { path: "404", element: <NotFound />},
      { path: "*", element: <NotFound />},
    ],
  },
]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <UpdateProvider>
                <RouterProvider router={router} />
            </UpdateProvider>
        </AuthProvider>
    </StrictMode>
);