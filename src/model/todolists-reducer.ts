 import {v1} from "uuid";
 import {FilterTodolistType} from "../components/Todolist";


type UpdateTodlistTitleAC=ReturnType<typeof updateTodlistTitleAC>
export type CreateTodolistAC= ReturnType<typeof createTodolistAC>
export type RemoveTodolistAC= ReturnType<typeof removeTodolistAC>
 type ChangeFilterACType= ReturnType<typeof changeFilterAC>

type ActionsType =  RemoveTodolistAC |CreateTodolistAC|UpdateTodlistTitleAC|ChangeFilterACType


 export type TodolistType = {
	 id: string
	 title: string
	 filter: FilterTodolistType
 }

 const initialstate:TodolistType[]= []
export const todolistsReducer = (state=initialstate, action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(t => t.id !== action.todolistID)
		}
		case "CREATE-TODOLIST":{
			const newTodo:TodolistType={id: action.todolistID, title:action.title , filter: 'all'}
			return [newTodo, ...state]
		}
		case "UPDATE-TITLE-TODOLIST":{
			return state.map(t=>t.id === action.todolistID?{...t, title:action.title}:t)
		}
		case "CHANGE-FILTER":{
			return state.map(t=>t.id === action.todolistID?{...t, filter:action.value}:t)
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
export const updateTodlistTitleAC = (todolistID: string, title:string) => {
	return {
		type: 'UPDATE-TITLE-TODOLIST',
		todolistID,
		title

	} as const
}

export const changeFilterAC =(todolistID: string, value:FilterTodolistType)=>{
	return{
		type: 'CHANGE-FILTER',
		todolistID,
		value
	}as const
}