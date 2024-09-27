import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from "./app/App";
import {store} from "./app/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {TodolistsList} from "./components/TodolistsList";
import {LoginCustom} from "./features/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
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
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);


