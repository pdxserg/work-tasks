import React from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../components/TodolistsList";
import {Loading} from "../components/Loading";
import {ErrorSnackbar} from "../components/errors/ErrorSnackbar";
import {LoginCustom} from "../features/login/Login";
import {Outlet} from "react-router-dom";



export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {
	return (

			<div>
				<Header/>
				<Loading/>
				<ErrorSnackbar/>
				<div>
					<Outlet/>
				</div>
			</div>



	)

}

export default App
const Header = () => {
	return (
		<header style={{backgroundColor: "lightblue"}}>
		<button>login</button>
		</header>
	)
}