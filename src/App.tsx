import React, {useState} from 'react';
import './App.css';
import {FilterTodolist, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TasksType = {
	[key:string]: TaskPropsType[]
}
export type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}
type TodolistType = {
	id: string
	title: string
	filter: FilterTodolist
}

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const checkBoxHandler = (todolistID: string, id: string, isDone: boolean) => {
		setTasks({
			...tasks, [todolistID]: tasks[todolistID]
				.map(task => task.id === id ? {...task, isDone} : task)
		})

	}

	const removeTask = (todolistID: string, id: string) => {
		setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
	}
	const createTask = (todolistID: string, title: string) => {
		const newTask = {id: v1(), title: title, isDone: false}
		setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
	}
	const removeTodolist = (todolistID: string) => {
		setTodolists(todolists.filter(t => t.id !== todolistID))
		delete tasks[todolistID]
	}
	const createTodolist=(title:string)=>{
		const newID= v1()
		const newTodo:TodolistType={id: newID, title , filter: 'all'}
		setTodolists([newTodo, ...todolists])

		setTasks({...tasks, [newID]:[]})
	}
	return (
		<div>
			<div style={{marginLeft: 200}}>
				<AddItemForm addItem={createTodolist}/>

			</div>
			<div className="App">

				{todolists.map(t => {
						return (
							<Todolist
								key={t.id}
								todolistID={t.id}
								title={t.title}
								tasks={tasks[t.id]}
								removeTask={removeTask}
								checkBoxHandler={checkBoxHandler}
								createTask={createTask}
								removeTodolist={removeTodolist}
							/>
						)
					}
				)}

			</div>
		</div>

	);
}

export default App;
