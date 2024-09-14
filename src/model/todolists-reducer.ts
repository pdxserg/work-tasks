import {v1} from "uuid";
import {FilterTodolist} from "../components/Todolist";
import {TodolistType} from "../api/todolists-api";

type UpdateTodlistTitleAC = ReturnType<typeof updateTodlistTitleAC>
export type CreateTodolistAC = ReturnType<typeof createTodolistAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>

type ActionsType = RemoveTodolistAC | CreateTodolistAC | UpdateTodlistTitleAC | ChangeFilterACType


export type TodolistDomainType = TodolistType & { filter: FilterTodolist }

const initialstate: TodolistDomainType[] = []
export const todolistsReducer = (state = initialstate, action: ActionsType): TodolistDomainType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(t => t.id !== action.todolistID)
		}
		case "CREATE-TODOLIST": {
			const newTodo: TodolistDomainType = {id: action.todolistID, title: action.title, filter: 'all',addedDate:"",order:0}
			return [newTodo, ...state]
		}
		case "UPDATE-TITLE-TODOLIST": {
			return state.map(t => t.id === action.todolistID ? {...t, title: action.title} : t)
		}
		case "CHANGE-FILTER": {
			return state.map(t => t.id === action.todolistID ? {...t, filter: action.value} : t)
		}
		default: {
			return state
		}
	}

}


export const removeTodolistAC = (todolistID: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		todolistID,

	} as const
}
export const createTodolistAC = (title: string) => {
	return {
		type: 'CREATE-TODOLIST',
		title,
		todolistID: v1()

	} as const
}
export const updateTodlistTitleAC = (todolistID: string, title: string) => {
	return {
		type: 'UPDATE-TITLE-TODOLIST',
		todolistID,
		title

	} as const
}

export const changeFilterAC = (todolistID: string, value: FilterTodolist) => {
	return {
		type: 'CHANGE-FILTER',
		todolistID,
		value
	} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
	return {
		type: 'CHANGE-FILTER',
		todolists
	} as const
}