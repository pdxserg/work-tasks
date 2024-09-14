import {CreateTodolistAC, RemoveTodolistAC, SetTodolistsACType} from "./todolists-reducer";
import {TasksStateType} from "../app/App";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";


type RemoveTaskACType = {
	type: 'REMOVE-TASK'
	todolistID: string, id: string
}
type ChangeStatusTaskAC = ReturnType<typeof changeStatusTaskAC>
type CreateTaskAC = ReturnType<typeof createTaskAC>
type UpdateTasTitlekACType = ReturnType<typeof updateTasTitlekAC>
type SetTasksAC = ReturnType<typeof setTasksAC>


type ActionsType = RemoveTaskACType
	| ChangeStatusTaskAC
	| CreateTaskAC
	| UpdateTasTitlekACType
	| RemoveTodolistAC
	| CreateTodolistAC
	| SetTodolistsACType
	| SetTasksAC
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
		case "REMOVE-TASK": {
			return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}
		}
		case "CHANGE-STATUS": {
			return {
				...state, [action.todolistID]: state[action.todolistID]
					.map(task => task.id === action.id ? {...task, status: action.newStatusValue} : task)
			}
		}
		case "CREATE-TASK": {
			const newTask = action.newTask
			return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}

		}
		case "UPDATE-TASK-TITLE":
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
					...t,
					title: action.title
				} : t)
			}
		case "REMOVE-TODOLIST": {
			let newState = {...state}
			delete newState[action.todolistID]
			return newState;
		}
		case "CREATE-TODOLIST": {
			return {...state, [action.todolistID]: []}
		}
		case "SET_TASKS":{
			return {...state, [action.todolistId]:action.tasks}
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

export const changeStatusTaskAC = (todolistID: string, id: string, newStatusValue: TaskStatuses) => {
	return {
		type: 'CHANGE-STATUS',
		todolistID,
		id,
		newStatusValue
	} as const
}
export const createTaskAC = (todolistID: string, newTask:TaskType) => {
	return {
		type: 'CREATE-TASK',
		todolistID,
		newTask,
	} as const
}
export const updateTasTitlekAC = (todolistID: string, id: string, title: string) => {
	return {
		type: 'UPDATE-TASK-TITLE',
		todolistID,
		id,
		title
	} as const
}
const setTasksAC = (tasks: TaskType[],todolistId:string) => {
	return {
		type: 'SET_TASKS',
		tasks,
		todolistId
	} as const
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {

	todolistsAPI.getTasks(todolistId)
		.then((res) => {
			return dispatch(setTasksAC(res.data.items,todolistId))
		})
}
export const createTaskTC = (todolistId: string,title: string) => (dispatch: Dispatch) => {

	todolistsAPI.createTask(todolistId,title)
		.then((res) => {
			return dispatch(createTaskAC(todolistId, res.data.data.item))
		})
}
