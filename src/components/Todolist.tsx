import React, {memo, useCallback, useMemo, useRef, useState,} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TasksType} from "../app/App";
import {Button} from "./Button";
import {Task} from "./Task";
import {createTaskAC} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {changeFilterAC, removeTodolistAC, TodolistType, updateTodlistTitleAC} from "../model/todolists-reducer";
import {RootState} from "../app/store";


type TodolistPropsType = {
	todolist: TodolistType
}
export type FilterTodolist = "all" | "active" | "completed"
export const Todolist = memo(({todolist}: TodolistPropsType) => {
	const tasks = useSelector<RootState, TasksType>(state => state.tasks)
	const dispatch = useDispatch()
	console.log('tasks: ', tasks)

	// const dateCreate = new Date().toLocaleString()
	// const dateCreate = useMemo(() => {
	// 	return new Date().toLocaleString()
	// }, [])

	// const [dateCreate] = useState(new Date().toLocaleString())
	const dateRef = useRef(new Date().toLocaleString())
	const dateCreate = dateRef.current

	let tasksT = tasks[todolist.id]
	if (todolist.filter === "active") {
		tasksT = tasksT.filter(task => !task.isDone)
	}
	if (todolist.filter === "completed") {
		tasksT = tasksT.filter(task => task.isDone)
	}

	console.log('task after filters: ', tasksT)

	const changeFilter = useCallback((todolistID: string, value: FilterTodolist) => {
		dispatch(changeFilterAC(todolistID, value))
	}, [dispatch])
	const updateTodlistTitle = useCallback((title: string) => {
		dispatch(updateTodlistTitleAC(todolist.id, title))
	}, [dispatch])

	const createTask = useCallback((title: string) => {
		dispatch(createTaskAC(todolist.id, title))
	}, [todolist.id])
	const removeTodolist = () => {
		const action = removeTodolistAC(todolist.id)
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
				<ul>
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


				</ul>
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