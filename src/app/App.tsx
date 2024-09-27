import React from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../components/TodolistsList";
import {Loading} from "../components/Loading";
import {ErrorSnackbar} from "../components/ErrorSnackbar";


export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {
	return (
		<div>
			<Header/>
			<Loading/>
			<ErrorSnackbar/>
			<TodolistsList/>
		</div>

	)

}

export default App
const Header = () => {
	return (
		<header style={{ backgroundColor: "blue"}}>
			<button>login</button>
		</header>
	)
}