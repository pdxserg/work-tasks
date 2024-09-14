import {FilterTodolist} from "../components/Todolist";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type UpdateTodlistTitleAC = ReturnType<typeof updateTodlistTitleAC>
export type CreateTodolistAC = ReturnType<typeof createTodolistAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>

type ActionsType = RemoveTodolistAC | CreateTodolistAC | UpdateTodlistTitleAC | ChangeFilterACType| SetTodolistsACType


export type TodolistDomainType = TodolistType & { filter: FilterTodolist }

const initialstate: TodolistDomainType[] = []
export const todolistsReducer = (state = initialstate, action: ActionsType): TodolistDomainType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(t => t.id !== action.todolistID)
		}
		case "CREATE-TODOLIST": {
			const newTodo: TodolistDomainType = {...action.todolist, filter: 'all',}
			return [newTodo, ...state]
		}
		case "UPDATE-TITLE-TODOLIST": {
			return state.map(t => t.id === action.todolistID ? {...t, title: action.title} : t)
		}
		case "CHANGE-FILTER": {
			return state.map(t => t.id === action.todolistID ? {...t, filter: action.value} : t)
		}
		case "SET-TODOLISTS":{
			 return action.todolists.map(t=>({...t, filter:"all"}))
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
export const createTodolistAC = (todolist: TodolistType) => {
	return {
		type: 'CREATE-TODOLIST',
		todolist

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
		type: 'SET-TODOLISTS',
		todolists
	} as const
}

// THUNK
export const setTodoTC=()=> (dispatch: Dispatch)=>{
todolistsAPI.getTodolists()
		.then((res)=>{
			return dispatch(setTodolistsAC(res.data))
		})
}
export const deleteTodoTC=(todoId:string)=> (dispatch: Dispatch)=>{
todolistsAPI.deleteTodolist(todoId)
		.then((res)=>{
			return dispatch(removeTodolistAC(todoId))
		})
}
export const createTodoTC=(title:string)=> (dispatch: Dispatch)=>{
todolistsAPI.createTodolist(title)
		.then((res)=>{
			return dispatch(createTodolistAC(res.data.data.item))
		})
}

