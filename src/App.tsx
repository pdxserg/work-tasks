import React, {useState} from 'react';
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
	const [tasks, setTasks] = useState<TaskPropsType[]>(
		[
			{id: v1(), title: "React", isDone: false},
			{id: v1(), title: "Hmtl", isDone: false},
			{id: v1(), title: "Hmtl", isDone: false},
			{id: v1(), title: "Hmtl", isDone: false},
		]
	)

	const removeTask =(id:string)=>{
		setTasks(tasks.filter(t=>t.id !== id))
	}
	return (
		<div className="App">
			<Todolist
				title={"Study"}
				tasks={tasks}
				removeTask={removeTask}
			/>
		</div>
	);
}

export default App;
