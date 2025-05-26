import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './index.css'
import "./assets/font.css"
import Home from "./pages/Home.jsx";
import CoursPage from "./pages/CoursPage.jsx";
import Login from "./pages/Login.jsx";


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
        <RouterProvider router={router}/>
    </StrictMode>
);