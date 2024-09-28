import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import App from "./app/App";
import {store} from "./app/store";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {TodolistsList} from "./components/TodolistsList";
import {LoginCustom} from "./features/login/Login";
import {ErrorPage} from "./components/errors/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement:<Navigate to="/404"/>,
        children: [
            {
                index: true,
                element: <Navigate to="/login"/>
            },
            {
                path: "/login",
                element: <LoginCustom/>,
            },
            {
                path: "/todolists",
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: "/404",
        element: <ErrorPage/>
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);


