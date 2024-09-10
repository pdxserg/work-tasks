import React, {memo, useCallback,} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskPropsType} from "../app/App";
import {Button} from "./Button";
import {Task} from "./Task";


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
	changeFilter: (todolistID: string, value: FilterTodolist) => void
}
export type FilterTodolist = "all" | "active" | "completed"
export const Todolist = memo((props: TodolistPropsType) => {


	let tasks = props.tasks
	if (props.filter === "active") {
		tasks = tasks.filter(task => !task.isDone)
	}
	if (props.filter === "completed") {
		tasks = tasks.filter(task => task.isDone)
	}
	const dateCreate = new Date().toLocaleString()
	const addItemHandler = useCallback((title: string) => {
		props.createTask(props.todolistID, title)
	}, [props.createTask, props.todolistID])

	const changeAllFilter = useCallback(() => {
		props.changeFilter(props.todolistID, "all")
	}, [props.changeFilter, props.todolistID])
	const changeActiveFilter = useCallback(() => {
		props.changeFilter(props.todolistID, "active")
	}, [props.changeFilter, props.todolistID])
	const changeCompletedFilter = useCallback(() => {
		props.changeFilter(props.todolistID, "completed")
	}, [props.changeFilter, props.todolistID])

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
					{tasks.length === 0
						? <span>No tasks</span>
						: tasks.map(task => {
							return <Task
							key={task.id}
							task={task}
							todolistId={props.todolistID}


							/>
						})
					}


				</ul>
				<div className={"filterButton"}>
					<Button
						className={props.filter === "all" ? "filterTasks" : ""}
						onClick={changeAllFilter}
						title={"All"}
					/>
					<Button
						className={props.filter === "active" ? "filterTasks" : ""}
						onClick={changeActiveFilter}
						title={"Active"}
					/>
					<Button
						className={props.filter === "completed" ? "filterTasks" : ""}
						onClick={changeCompletedFilter}
						title={"Completed"}
					/>
				</div>

			</div>

		</div>
	)
})