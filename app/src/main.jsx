import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {AuthProvider} from "./services/AuthContext.jsx";
import {UpdateProvider} from "./services/UpdateContext.jsx";


import './index.css'
import "./assets/font.css"
import Home from "./pages/Home.jsx";
import CoursPage from "./pages/CoursPage.jsx";
import Login from "./pages/Login.jsx";

import './Ui/variables.css'
import "./Ui/search.css"
import "./Ui/button.css"
const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home/>,
    },
    {
        path: "/:id",
        element: <CoursPage/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <UpdateProvider>
                <RouterProvider router={router}/>
            </UpdateProvider>
        </AuthProvider>
    </StrictMode>
);