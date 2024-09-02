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
			{id: v1(), title: "Hmtl", isDone: true},
			{id: v1(), title: "Hmtl", isDone: false},
			{id: v1(), title: "Hmtl", isDone: false},
		]
	)
const checkBoxHandler=(id: string, isDone:boolean)=>{
	 setTasks(tasks.map(task => task.id === id?  {...task, isDone} : task))

}

	const removeTask =(id:string)=>{
		setTasks(tasks.filter(t=>t.id !== id))
	}
	const createTask =(title: string)=>{
		const newTask = {id: v1(), title: title, isDone: false}
		setTasks([newTask, ...tasks ])
	}
	return (
		<div className="App">
			<Todolist
				title={"Study"}
				tasks={tasks}
				removeTask={removeTask}
				checkBoxHandler={checkBoxHandler}
				createTask={createTask}
			/>
		</div>
	);
}

export default App;
