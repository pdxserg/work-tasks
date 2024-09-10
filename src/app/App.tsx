import React, {useCallback} from 'react';
import './App.css';
import {FilterTodolist, Todolist} from "../Todolist";
import {AddItemForm} from "../components/AddItemForm";

import {changeStatusTaskAC, createTaskAC, removeTaskAC, updateTasTitlekAC} from "../model/tasks-reducer";
import {
	changeFilterAC,
	createTodolistAC,
	removeTodolistAC,
	TodolistType,
	updateTodlistTitleAC
} from "../model/todolists-reducer";
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

function App() {

	const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
	  const tasks= useSelector<RootState, TasksType>(state => state.tasks)
	const dispatch= useDispatch()
	const removeTask = (todolistID: string, id: string) => {
		dispatch(removeTaskAC(todolistID,id))
	}
	const createTask = useCallback((todolistID: string, title: string) => {
		dispatch(createTaskAC(todolistID,title) )
	},[dispatch])
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
	const updateTodlistTitle=useCallback((todolistID: string,title:string)=>{
		dispatch(updateTodlistTitleAC(todolistID,title))
	},[dispatch])
const changeFilter =( todolistID: string, value: FilterTodolist)=>{
		dispatch(changeFilterAC(todolistID,value))
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
								filter={t.filter}
								removeTask={removeTask}
								checkBoxHandler={checkBoxHandler}
								createTask={createTask}
								removeTodolist={removeTodolist}
								updateTodlistTitle={updateTodlistTitle}
								updateTaskTitle={updateTaskTitle}
								changeFilter={changeFilter}
							/>
						)
					}
				)}

			</div>
		</div>

	);
}

export default App;
