import {CreateTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TasksStateType} from "../app/App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";


type ActionsType =
	| RemoveTodolistACType
	| CreateTodolistACType
	| SetTodolistsACType
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof createTaskAC>
	| ReturnType<typeof setTasksAC>

const initialstate: TasksStateType = {}
export const tasksReducer = (state = initialstate, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			const stateCopy = {...state}
			action.todolists.forEach(tl => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}
		case "REMOVE-TASK":
			return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}

		case "UPDATE-TASK": {
			return {
				...state, [action.todolistID]: state[action.todolistID]
					.map(task => task.id === action.id ? {...task, ...action.domainModel} : task)
			}
		}
		case "CREATE-TASK": {
			const newTask = action.newTask
			return {...state, [action.newTask.todoListId]: [newTask, ...state[action.newTask.todoListId]]}
		}

		case "REMOVE-TODOLIST": {
			let newState = {...state}
			delete newState[action.todolistID]
			return newState;
		}
		case "CREATE-TODOLIST": {
			return {...state, [action.todolist.id]: []}
		}
		case "SET_TASKS": {
			return {...state, [action.todolistId]: action.tasks}
		}
		default: {
			return state
		}
	}

}

export const removeTaskAC = (todolistID: string, id: string) => {
	return {
		type: 'REMOVE-TASK',
		todolistID,
		id
	} as const
}

export const updateTaskAC = (todolistID: string, id: string, domainModel: UpdateDomainTaskModelType) => {
	return {
		type: 'UPDATE-TASK',
		todolistID,
		id,
		domainModel
	} as const
}
export const createTaskAC = (newTask: TaskType) => {
	return {
		type: 'CREATE-TASK',
		newTask,
	} as const
}

const setTasksAC = (tasks: TaskType[], todolistId: string) => {
	return {
		type: 'SET_TASKS',
		tasks,
		todolistId
	} as const
}

//THUNK
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.getTasks(todolistId)
		.then((res) => {
			return dispatch(setTasksAC(res.data.items, todolistId))
		})
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
	todolistsAPI.createTask(todolistId, title)
		.then((res) => {
			return dispatch(createTaskAC(res.data.data.item))
		})
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTask(todolistId, taskId)
		.then(() => {
			return dispatch(removeTaskAC(todolistId, taskId))
		})
}

type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	const state = getState()
	if (state.tasks) {
		// @ts-ignore
		const task = state.tasks[todolistId].find(t => t.id === taskId)

		let apiModel: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			priority: task.TaskPriorities,
			startDate: task.startDate,
			deadline: task.deadline,
			status: task.status,
			...domainModel
		}
		todolistsAPI.updateTask(todolistId, taskId, apiModel)
			.then(() => {
				return dispatch(updateTaskAC(todolistId, taskId, domainModel))
			})
	}
}
