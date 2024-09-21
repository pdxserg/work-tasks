import React, {ChangeEvent, memo,} from "react";

import {EditableSpan} from "./EditableSpan";
import {deleteTaskTC, updateTaskTC} from "../model/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useAppDispatch} from "../app/store";


type TaskPropsType = {
	task: TaskType
	todolistId: string
	disabled:boolean

}

export const Task = memo(({task, todolistId, disabled}: TaskPropsType) => {
	const dispatch = useAppDispatch()

	const removeTask =  () => {dispatch(deleteTaskTC(todolistId, task.id))}

	const checkBoxHandler =  (todolistID: string, id: string, newStatusValue: TaskStatuses) => {
		dispatch(updateTaskTC(todolistID, id, {status:newStatusValue}))
	}
	const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		checkBoxHandler(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
	}
	const updateTaskTitle =  (todolistID: string, id: string, title: string) => {
	 dispatch(updateTaskTC(todolistID, id, {title}))
	}
	const updatedTitle = (title: string) => {
		updateTaskTitle(todolistId, task.id, title)

	}
	return (
		<div
			 className={task.status===TaskStatuses.Completed ? "finished" : ""}
			>
			<input type="checkbox"
			       disabled={disabled}
			        checked={task.status===TaskStatuses.Completed}
			       onChange={checkboxHandler}/>
			<EditableSpan title={task.title} updatedTitle={updatedTitle}/>
			<button disabled={disabled}  onClick={removeTask}>x</button>
		</div>
	)


})