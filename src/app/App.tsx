import React from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../components/TodolistsList";
import {Loading} from "../components/Loading";



export type TasksStateType = {
	[key: string]: TaskType[]
}


function App() {
return(
	<>
		<Loading/>
		<TodolistsList/>
	</>

)

}
export default App