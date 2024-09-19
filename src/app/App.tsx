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
return(
	<div>
		<Loading/>
		<ErrorSnackbar/>
		<TodolistsList/>
	</div>

)

}
export default App