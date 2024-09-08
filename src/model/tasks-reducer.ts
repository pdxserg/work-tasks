import {TasksType} from "../App";



type RemoveTaskACType = {
	type: 'REMOVE-TASK'
	todolistID: string, id: string
}
type ActionsType=RemoveTaskACType

export const tasksReducer=(state:TasksType, action:ActionsType):any=>{
switch (action.type) {
	case "REMOVE-TASK":{
		return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}
	}
		default:{
			return state
		}
}

}

export const removeTaskAC=(todolistID: string, id: string)=>{
	return {
		type :'REMOVE-TASK',
		todolistID,
		id
	} as const
}