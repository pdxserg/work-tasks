import {TasksType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistAC= ReturnType<typeof removeTodolistAC>
type ActionsType =  RemoveTodolistAC

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(t => t.id !== action.todolistID)
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

