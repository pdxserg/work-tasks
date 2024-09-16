import {FilterTodolist} from "../components/Todolist";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";




export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

type ActionsType =
	| SetTodolistsACType
	| CreateTodolistACType
	| RemoveTodolistACType
	| ReturnType<typeof updateTodlistTitleAC>
	| ReturnType<typeof changeFilterAC>


export type TodolistDomainType = TodolistType & { filter: FilterTodolist }

const initialstate: TodolistDomainType[] = []
export const todolistsReducer = (state = initialstate, action: ActionsType): TodolistDomainType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST":
			return state.filter(t => t.id !== action.todolistID)

		case "CREATE-TODOLIST":
			return [{...action.todolist, filter: 'all'}, ...state]

		case "UPDATE-TITLE-TODOLIST":
			return state.map(t => t.id === action.todolistID ? {...t, title: action.title} : t)

		case "CHANGE-FILTER":
			return state.map(t => t.id === action.todolistID ? {...t, filter: action.value} : t)

		case "SET-TODOLISTS":
			return action.todolists.map(t => ({...t, filter: "all"}))

		default: {
			return state
		}
	}

}
export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID,}) as const
export const createTodolistAC = (todolist: TodolistType) => ({type: 'CREATE-TODOLIST', todolist}) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists}) as const

export const updateTodlistTitleAC = (todolistID: string, title: string) => {
	return {type: 'UPDATE-TITLE-TODOLIST', todolistID, title} as const
}
export const changeFilterAC = (todolistID: string, value: FilterTodolist) => {
	return {type: 'CHANGE-FILTER', todolistID, value} as const
}


// THUNK
export const setTodoTC = () => (dispatch: Dispatch) => {
	todolistsAPI.getTodolists()
		.then((res) => {
			return dispatch(setTodolistsAC(res.data))
		})
}
export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTodolist(todoId)
		.then(() => {
			return dispatch(removeTodolistAC(todoId))
		})
}
export const createTodoTC = (title: string) => (dispatch: Dispatch) => {
	todolistsAPI.createTodolist(title)
		.then((res) => {
			return dispatch(createTodolistAC(res.data.data.item))
		})
}
export const updateTodoTC = (id: string, title: string) => (dispatch: Dispatch) => {
	todolistsAPI.updateTodolist(id, title)
		.then(() => {
			return dispatch(updateTodlistTitleAC(id, title))
		})
}

