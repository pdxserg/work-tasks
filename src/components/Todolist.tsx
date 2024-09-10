import React, {ChangeEvent, memo, useCallback,} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskPropsType} from "../app/App";


type TodolistPropsType = {
	title: string,
	tasks: TaskPropsType[]
	removeTask: (todolistID: string, id: string) => void
	checkBoxHandler: (todolistID: string, id: string, isDone: boolean) => void
	createTask: (todolistID: string, title: string) => void
	updateTaskTitle: (todolistID: string, id: string, title: string) => void
	todolistID: string
	filter: FilterTodolist
	removeTodolist: (todolistID: string) => void
	updateTodlistTitle: (todolistID: string, title: string) => void
	changeFilter: (todolistID: string, value:FilterTodolist) =>void
}
export type FilterTodolist = "all" | "active" | "completed"
export const Todolist =memo( (props: TodolistPropsType) => {


	let alltasks = props.tasks
	let tasksTodolist =alltasks
	if (props.filter === "active") {
		tasksTodolist = alltasks.filter(task => !task.isDone)
	}
	if (props.filter === "completed") {
		tasksTodolist = alltasks.filter(task => task.isDone)
	}
	const dateCreate = new Date().toLocaleString()
	const addItemHandler = useCallback((title: string) => {
		props.createTask(props.todolistID, title)
	}, [props.createTask, props.todolistID])

	const changeAllFilter = () => {
		props.changeFilter(props.todolistID, "all")
	}
	const changeActiveFilter = () => {
		props.changeFilter(props.todolistID, "active")
	}
	const changeCompletedFilter = () => {
		props.changeFilter(props.todolistID, "completed")
	}

	const removeTodolistHandler = () => {
		props.removeTodolist(props.todolistID)
	}
	const updateTodlistTitle = useCallback((title: string) => {
		props.updateTodlistTitle(props.todolistID, title)
	}, [props.updateTodlistTitle, props.todolistID])

	return (
		<div className="task-conteiner">
			<div>
				<EditableSpan title={props.title} updatedTitle={updateTodlistTitle}/>
				<button onClick={removeTodolistHandler}>x</button>
				<h5>{dateCreate}</h5>
				<AddItemForm addItem={addItemHandler}/>
				<ul>
					{tasksTodolist.length === 0
						? <span>No tasks</span>
						: tasksTodolist.map(task => {
							const removeHandler = () => {
								props.removeTask(props.todolistID, task.id)
							}
							const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
								props.checkBoxHandler(props.todolistID, task.id, e.currentTarget.checked)
							}
							const updateTaskTitle = (title: string) => {
								props.updateTaskTitle(props.todolistID, task.id, title)

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
					<button className={props.filter === "all" ? "filterTasks" : ""}
					        onClick={changeAllFilter}>All
					</button>
					<button className={props.filter === "active" ? "filterTasks" : ""}
					        onClick={changeActiveFilter}>Active
					</button>
					<button className={props.filter === "completed" ? "filterTasks" : ""}
					        onClick={changeCompletedFilter}>Complited
					</button>
				</div>

			</div>

		</div>
	)
})