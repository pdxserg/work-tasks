import React, {useReducer } from 'react';
import '../App.css';
import {FilterTodolist, Todolist} from "../Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm";

import {changeStatusTaskAC, createTaskAC, removeTaskAC, tasksReducer, updateTasTitlekAC} from "../model/tasks-reducer";
import {createTodolistAC, removeTodolistAC, todolistsReducer, updateTodlistTitleAC} from "../model/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";


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
	// let todolistID1 = v1()
	// let todolistID2 = v1()
	//
	// let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
	// 	{id: todolistID1, title: 'What to learn', filter: 'all'},
	// 	{id: todolistID2, title: 'What to buy', filter: 'all'},
	// ])
	//
	// let [tasks, dispatchTasks] = useReducer (tasksReducer, {
	// 	[todolistID1]: [
	// 		{id: v1(), title: 'HTML&CSS', isDone: true},
	// 		{id: v1(), title: 'JS', isDone: true},
	// 		{id: v1(), title: 'ReactJS', isDone: false},
	// 	],
	// 	[todolistID2]: [
	// 		{id: v1(), title: 'Rest API', isDone: true},
	// 		{id: v1(), title: 'GraphQL', isDone: false},
	// 	],
	// })
	// console.log(tasks)

	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
	const tasks= useSelector<RootState, TasksType>(state => state.tasks)
	const dispatch= useDispatch()
	const removeTask = (todolistID: string, id: string) => {
		dispatch(removeTaskAC(todolistID,id))
	}
	const createTask = (todolistID: string, title: string) => {
		dispatch(createTaskAC(todolistID,title) )
	}
	const checkBoxHandler = (todolistID: string, id: string, isDone: boolean) => {
		dispatch(changeStatusTaskAC(todolistID,id,isDone))

	}
	// todolist
	const updateTaskTitle=(todolistID: string,id: string, title: string)=>{
		dispatch(updateTasTitlekAC(todolistID,id,title) )
	}
	const removeTodolist = (todolistID: string) => {
		const action=removeTodolistAC(todolistID)
		dispatch(action)

	}
	const createTodolist=(title:string)=>{
		const action= createTodolistAC(title)
		dispatch(action)

	}
	const updateTodlistTitle=(todolistID: string,title:string)=>{
		dispatch(updateTodlistTitleAC(todolistID,title))
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
