import React from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../components/TodolistsList";



export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {
return(
	<>
		<TodolistsList/>
	</>

)

}
export default App