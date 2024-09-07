import React, {useState} from 'react';
import './App.css';
import {FilterTodolist, Todolist} from "./Todolist";
import {v1} from "uuid";


export type TasksPropsType = {
	tasks: TaskPropsType[]
}
export type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}
type TodolistType={
	id:string
	title:string
	filter:FilterTodolist
}

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})
const checkBoxHandler=(id: string, isDone:boolean)=>{
	 // setTasks(tasks.map(task => task.id === id?  {...task, isDone} : task))

}

	const removeTask =(id:string)=>{
		// setTasks(tasks.filter(t=>t.id !== id))
	}
	const createTask =(title: string)=>{
		const newTask = {id: v1(), title: title, isDone: false}
		// setTasks([newTask, ...tasks ])
	}
	return (
		<div className="App">

			{todolists.map(t=>{
				return(
					<Todolist
						title={t.title}
						tasks={tasks[t.id]}
						removeTask={removeTask}
						checkBoxHandler={checkBoxHandler}
						createTask={createTask}
					/>
				)
				}

			)}

		</div>
	);
}

export default App;
