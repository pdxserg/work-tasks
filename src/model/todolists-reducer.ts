import {FilterTodolist} from "../components/Todolist";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../app/store";
import {errorAC, setRemoveLoadingAC} from "./app-reducer";


const initialstate: TodolistDomainType[] = []
export const todolistsReducer = (state = initialstate, action: ActionsTodosType): TodolistDomainType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST":
			return state.filter(t => t.id !== action.id)

		case "CREATE-TODOLIST":
			return [{...action.todolist, filter: 'all'}, ...state]

		case "UPDATE-TITLE-TODOLIST":
			return state.map(t => t.id === action.id ? {...t, title: action.title} : t)

		case "CHANGE-FILTER":
			return state.map(t => t.id === action.id ? {...t, filter: action.value} : t)

		case "SET-TODOLISTS":
			return action.todolists.map(t => ({...t, filter: "all"}))

		default: {
			return state
		}
	}

}
//ACTION
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id,}) as const
export const createTodolistAC = (todolist: TodolistType) => ({type: 'CREATE-TODOLIST', todolist}) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists}) as const
export const updateTodlistTitleAC = (id: string, title: string) => {
	return {type: 'UPDATE-TITLE-TODOLIST', id, title} as const
}
export const changeFilterAC = (id: string, value: FilterTodolist) => {
	return {type: 'CHANGE-FILTER', id, value} as const
}



// THUNK
export const setTodoTC = (): AppThunk => (dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.getTodolists()
		.then((res) => {
			dispatch(setRemoveLoadingAC('idel'))
			dispatch(setTodolistsAC(res.data))
		})
}
export const deleteTodoTC = (id: string): AppThunk => (dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.deleteTodolist(id)
		.then(() => {
			dispatch(setRemoveLoadingAC('idel'))
			dispatch(removeTodolistAC(id))
		})
}
export const createTodoTC = (title: string): AppThunk => (dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.createTodolist(title)
		.then((res) => {

			dispatch(setRemoveLoadingAC('idel'))
			dispatch(createTodolistAC(res.data.data.item))
		})

}
export const updateTodoTC = (id: string, title: string): AppThunk => (dispatch) => {
	todolistsAPI.updateTodolist(id, title)
		.then(() => {
			return dispatch(updateTodlistTitleAC(id, title))
		})
}

// TYPES
export type TodolistDomainType = TodolistType & { filter: FilterTodolist }

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export type ActionsTodosType =
	| SetTodolistsACType
	| CreateTodolistACType
	| RemoveTodolistACType
	| ReturnType<typeof updateTodlistTitleAC>
	| ReturnType<typeof changeFilterAC>
