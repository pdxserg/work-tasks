import React, {ChangeEvent, memo,} from "react";

import {EditableSpan} from "./EditableSpan";
import {changeStatusTaskAC, removeTaskAC, updateTasTitlekAC} from "../model/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../api/todolists-api";


type TaskPropsType = {
	task: TaskType
	todolistId: string


}

export const Task = memo(({task, todolistId}: TaskPropsType) => {
	const dispatch = useDispatch()

	const removeTask =  () => {dispatch(removeTaskAC(todolistId, task.id))}

	const checkBoxHandler =  (todolistID: string, id: string, newStatusValue: TaskStatuses) => {
		dispatch(changeStatusTaskAC(todolistID, id, newStatusValue))
	}
	const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		checkBoxHandler(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
	}
	const updateTaskTitle =  (todolistID: string, id: string, title: string) => {
		dispatch(updateTasTitlekAC(todolistID, id, title))
	}
	const updatedTitle = (title: string) => {
		updateTaskTitle(todolistId, task.id, title)

	}
	return (
		<div
			 className={task.status===TaskStatuses.Completed ? "finished" : ""}
			>
			<input type="checkbox"
			        checked={task.status==TaskStatuses.Completed}
			       onChange={checkboxHandler}/>
			<EditableSpan title={task.title} updatedTitle={updatedTitle}/>
			<button onClick={removeTask}>x</button>
		</div>
	)


})