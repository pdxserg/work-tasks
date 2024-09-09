import React, {useReducer, useState} from 'react';
import './App.css';
import {FilterTodolist, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {changeStatusTaskAC, createTaskAC, removeTaskAC, tasksReducer, updateTasTitlekAC} from "./model/tasks-reducer";
import {createTodolistAC, removeTodolistAC, todolistsReducer, updateTodlistTitleAC} from "./model/todolists-reducer";


export type TasksType = {
	[key:string]: TaskPropsType[]
}
export type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
}
export type TodolistType = {
	id: string
	title: string
	filter: FilterTodolist
}

function AppWithRedux() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchTasks] = useReducer (tasksReducer, {
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
	console.log(tasks)

	const removeTask = (todolistID: string, id: string) => {
		dispatchTasks(removeTaskAC(todolistID,id))
	}
	const createTask = (todolistID: string, title: string) => {
		dispatchTasks(createTaskAC(todolistID,title) )
	}
	const checkBoxHandler = (todolistID: string, id: string, isDone: boolean) => {
		dispatchTasks(changeStatusTaskAC(todolistID,id,isDone))

	}
	// todolist
	const updateTaskTitle=(todolistID: string,id: string, title: string)=>{
		  dispatchTasks(updateTasTitlekAC(todolistID,id,title) )
	}
	const removeTodolist = (todolistID: string) => {
		const action=removeTodolistAC(todolistID)
		dispatchTodolists(action)
		dispatchTasks(action)
	}
	const createTodolist=(title:string)=>{
		const action= createTodolistAC(title)
		dispatchTodolists(action)
		  dispatchTasks(action)
	}
	const updateTodlistTitle=(todolistID: string,title:string)=>{
		  dispatchTodolists(updateTodlistTitleAC(todolistID,title))
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
								updateTodlistTitle={updateTodlistTitle}
								updateTaskTitle={updateTaskTitle}
							/>
						)
					}
				)}

			</div>
		</div>

	);
}

export default AppWithRedux;
