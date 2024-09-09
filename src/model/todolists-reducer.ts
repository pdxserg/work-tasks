import { TodolistType} from "../App";
import {v1} from "uuid";
import {createTaskAC} from "./tasks-reducer";

 type CreateTodolistAC= ReturnType<typeof createTodolistAC>
export type RemoveTodolistAC= ReturnType<typeof removeTodolistAC>
type ActionsType =  RemoveTodolistAC |CreateTodolistAC

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(t => t.id !== action.todolistID)
		}
		case "CREATE-TODOLIST":{
			const newTodo:TodolistType={id: action.todolistID, title:action.title , filter: 'all'}
			return [newTodo, ...state]
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

