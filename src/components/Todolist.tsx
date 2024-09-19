import React, {memo, useCallback, useEffect, useState,} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TasksStateType} from "../app/App";
import {Button} from "./Button";
import {Task} from "./Task";
import {createTaskTC, setTasksTC} from "../model/tasks-reducer";
import {useSelector} from "react-redux";
import {changeFilterAC, deleteTodoTC, TodolistDomainType, updateTodoTC} from "../model/todolists-reducer";
import {TaskStatuses} from "../api/todolists-api";
import {AppRootStateType, useAppDispatch} from "../app/store";


type TodolistPropsType = {
	todolist: TodolistDomainType
}
export type FilterTodolist = "all" | "active" | "completed"
export const Todolist = memo(({todolist}: TodolistPropsType) => {

	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(setTasksTC(todolist.id))
	}, []);
	const [dateCreate] =useState( new Date().toLocaleString())


	let tasksT = tasks[todolist.id]
	if (todolist.filter === "active") {
		tasksT = tasks[todolist.id].filter(task => task.status === TaskStatuses.New)
	}
	if (todolist.filter === "completed") {
		tasksT = tasks[todolist.id].filter(task => task.status === TaskStatuses.Completed)
	}
	const changeFilter = useCallback((todolistID: string, value: FilterTodolist) => {
		dispatch(changeFilterAC(todolistID, value))
	}, [dispatch])
	const updateTodlistTitle = useCallback((title: string) => {
		dispatch(updateTodoTC(todolist.id, title))
	}, [dispatch, todolist.id])

	const createTask = useCallback((title: string) => {
		dispatch(createTaskTC(todolist.id, title))
	}, [todolist.id])
	const removeTodolist = () => {
		const action = deleteTodoTC(todolist.id)
		dispatch(action)
	}

	const changeAllFilter = useCallback(() => {
		changeFilter(todolist.id, "all")
	}, [todolist.id])
	const changeActiveFilter = useCallback(() => {
		changeFilter(todolist.id, "active")
	}, [todolist.id])
	const changeCompletedFilter = useCallback(() => {
		changeFilter(todolist.id, "completed")
	}, [todolist.id])


	return (
		<div className="task-conteiner">
			<div>
				<EditableSpan title={todolist.title} updatedTitle={updateTodlistTitle}/>
				<button onClick={removeTodolist}>x</button>
				<h5>{dateCreate}</h5>
				<AddItemForm addItem={createTask}/>
				<div>
					{tasksT.length === 0
						? <span>No tasks</span>
						: tasksT.map(task => {
							return <Task
								key={task.id}
								task={task}
								todolistId={todolist.id}


							/>
						})
					}


				</div>
				<div className={"filterButton"}>
					<Button
						className={todolist.filter === "all" ? "filterTasks" : ""}
						onClick={changeAllFilter}
						title={"All"}
					/>
					<Button
						className={todolist.filter === "active" ? "filterTasks" : ""}
						onClick={changeActiveFilter}
						title={"Active"}
					/>
					<Button
						className={todolist.filter === "completed" ? "filterTasks" : ""}
						onClick={changeCompletedFilter}
						title={"Completed"}
					/>
				</div>

			</div>

		</div>
	)
})