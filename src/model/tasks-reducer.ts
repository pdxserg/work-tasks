
import {v1} from "uuid";
import {CreateTodolistAC, RemoveTodolistAC, SetTodolistsACType} from "./todolists-reducer";
import {TasksType} from "../app/App";


type RemoveTaskACType = {
	type: 'REMOVE-TASK'
	todolistID: string, id: string
}
type ChangeStatusTaskAC = ReturnType<typeof changeStatusTaskAC>
type CreateTaskAC = ReturnType<typeof createTaskAC>
type UpdateTasTitlekACType = ReturnType<typeof updateTasTitlekAC>

type ActionsType = RemoveTaskACType
	| ChangeStatusTaskAC
	| CreateTaskAC
	| UpdateTasTitlekACType
	| RemoveTodolistAC
	| CreateTodolistAC
|SetTodolistsACType
const initialstate:TasksType= {}
export const tasksReducer = (state=  initialstate, action: ActionsType): TasksType => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			const stateCopy = { ...state }
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
					.map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)
			}
		}
		case "CREATE-TASK": {
			const newTask = {id: action.id, title: action.title, isDone: false}
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
		case "CREATE-TODOLIST":{
			return {...state, [action.todolistID]:[]}
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

export const changeStatusTaskAC = (todolistID: string, id: string, isDone: boolean) => {
	return {
		type: 'CHANGE-STATUS',
		todolistID,
		id,
		isDone
	} as const
}
export const createTaskAC = (todolistID: string, title: string) => {
	return {
		type: 'CREATE-TASK',
		todolistID,
		title,
		id: v1()
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