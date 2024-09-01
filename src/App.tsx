import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TasksPropsType = {
	tasks: TaskPropsType[]
}
export type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}

function App() {
	const tasks: TaskPropsType[] = [
		{id: v1(), title: "React", isDone: false},
		{id: v1(), title: "Hmtl", isDone: false},
		{id: v1(), title: "Hmtl", isDone: false},
		{id: v1(), title: "Hmtl", isDone: false},
	]
	return (
		<div className="App">
			<Todolist
				title={"Study"}
				tasks={tasks}
			/>
		</div>
	);
}

export default App;
