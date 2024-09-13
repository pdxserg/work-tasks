import React, {ChangeEvent, memo} from "react";

import {EditableSpan} from "./EditableSpan";
import {changeStatusTaskAC, removeTaskAC, updateTasTitlekAC} from "../model/tasks-reducer";
import {useDispatch} from "react-redux";

import {TaskPropsType} from "../app/App";


type TaskType = {
	task: TaskPropsType
	todolistId: string


}

export const Task = memo(({task, todolistId}: TaskType) => {
	const dispatch = useDispatch()

	const removeTask =  () => {dispatch(removeTaskAC(todolistId, task.id))}

	const checkBoxHandler =  (todolistID: string, id: string, isDone: boolean) => {
		dispatch(changeStatusTaskAC(todolistID, id, isDone))
	}
	const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
		checkBoxHandler(todolistId, task.id, e.currentTarget.checked)
	}
	const updateTaskTitle =  (todolistID: string, id: string, title: string) => {
		dispatch(updateTasTitlekAC(todolistID, id, title))
	}
	const updatedTitle = (title: string) => {
		updateTaskTitle(todolistId, task.id, title)

	}
	return (
		<div className={task.isDone ? "finished" : ""}>
			<input type="checkbox" checked={task.isDone} onChange={checkboxHandler}/>
			<EditableSpan title={task.title} updatedTitle={updatedTitle}/>
			<button onClick={removeTask}>x</button>
		</div>
	)


})