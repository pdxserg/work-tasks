import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskPropsType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


type TodolistPropsType = {
	title: string,
	tasks: TaskPropsType[]
	removeTask: (todolistID: string, id: string) => void
	checkBoxHandler: (todolistID: string, id: string, isDone: boolean) => void
	createTask: (todolistID: string, title: string) => void
	todolistID: string
	removeTodolist: (todolistID: string) => void
	updateTodlistTitle:(todolistID: string, title: string) => void
	updateTaskTitle:(todolistID: string,id: string, title: string) => void
}
export type FilterTodolist = "all" | "active" | "complited"
export const Todolist = (props: TodolistPropsType) => {
	const [filter, setFilter] = useState<FilterTodolist>("all")

	let tasks = props.tasks
	if (filter === "active") {
		tasks = tasks.filter(task => !task.isDone)
	}
	if (filter === "complited") {
		tasks = tasks.filter(task => task.isDone)
	}
	const dateCreate = new Date().toLocaleString()
const addItemHandler=(title:string)=>{
		props.createTask(props.todolistID,title)
}

	const changeAllFilter = () => {
		setFilter("all")
	}
	const changeActiveFilter = () => {
		setFilter("active")
	}
	const changeComplitedFilter = () => {
		setFilter("complited")
	}

	const removeTodolistHandler = () => {
		props.removeTodolist(props.todolistID)
	}
	const updateTodlistTitle=(title:string)=>{
		props.updateTodlistTitle(props.todolistID,title )
	}

	return (
		<div className="task-conteiner">
			<div>
				<EditableSpan title={props.title} updatedTitle={updateTodlistTitle}/>
				<button onClick={removeTodolistHandler}>x</button>
				<h5>{dateCreate}</h5>
				<AddItemForm addItem={addItemHandler}/>
				<ul>
					{tasks.length === 0
						? <span>No tasks</span>
						: tasks.map(task => {
							const removeHandler = () => {
								props.removeTask(props.todolistID, task.id)
							}
							const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
								props.checkBoxHandler(props.todolistID, task.id, e.currentTarget.checked)
							}
							const updateTaskTitle=(title:string)=>{
								props.updateTaskTitle(props.todolistID,task.id,title)

							}
							return <li key={task.id} className={task.isDone ? "finished" : ""}>

								<input type="checkbox" checked={task.isDone} onChange={checkboxHandler}/>
								 <EditableSpan title={task.title}
								updatedTitle={updateTaskTitle}/>

								<button onClick={removeHandler}>x</button>
							</li>
						})
					}


				</ul>
				<div className={"filterButton"}>
					<button className={filter === "all" ? "filterTasks" : ""}
					        onClick={changeAllFilter}>All
					</button>
					<button className={filter === "active" ? "filterTasks" : ""}
					        onClick={changeActiveFilter}>Active
					</button>
					<button className={filter === "complited" ? "filterTasks" : ""}
					        onClick={changeComplitedFilter}>Complited
					</button>
				</div>

			</div>

		</div>
	)
}