import {CreateTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TasksStateType} from "../app/App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../app/store";
import {ActionsLoadingType, errorAC, setRemoveLoadingAC} from "./app-reducer";


const initialstate: TasksStateType = {}
export const tasksReducer = (state = initialstate, action: ActionsTasksType): TasksStateType => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			const stateCopy = {...state}
			action.todolists.forEach(tl => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}

		case "REMOVE-TASK":
			return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}

		case "UPDATE-TASK": {
			return {
				...state, [action.todolistID]: state[action.todolistID]
					.map(task => task.id === action.id ? {...task, ...action.domainModel} : task)
			}
		}

		case "CREATE-TASK": {
			const newTask = action.newTask
			return {...state, [action.newTask.todoListId]: [newTask, ...state[action.newTask.todoListId]]}
		}

		case "REMOVE-TODOLIST": {
			let newState = {...state}
			delete newState[action.id]
			return newState;
		}

		case "CREATE-TODOLIST":
			return {...state, [action.todolist.id]: []}

		case "SET_TASKS":
			return {...state, [action.todolistId]: action.tasks}

		default: {
			return state
		}
	}

}

export const removeTaskAC = (todolistID: string, id: string) => ({type: 'REMOVE-TASK', todolistID, id} as const)
export const createTaskAC = (newTask: TaskType) => ({type: 'CREATE-TASK', newTask,} as const)
const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const)
export const updateTaskAC = (todolistID: string, id: string, domainModel: UpdateDomainTaskModelType) => {
	return {type: 'UPDATE-TASK', todolistID, id, domainModel} as const
}


//THUNK
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsTasksType |ActionsLoadingType>) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.getTasks(todolistId)
		.then((res) => {
			dispatch(setRemoveLoadingAC('idel'))
			dispatch(setTasksAC(res.data.items, todolistId))
		})
}
export const createTaskTC = (todolistId: string, title: string):AppThunk => (dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.createTask(todolistId, title)
		.then((res) => {
			if(res.data.messages.length){
				dispatch(errorAC(res.data.messages[0]))
				dispatch(setRemoveLoadingAC('idel'))
			}else{
				dispatch(setRemoveLoadingAC('idel'))
				dispatch(createTaskAC(res.data.data.item))
			}

		})
}
export const deleteTaskTC = (todolistId: string, taskId: string):AppThunk => (dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	todolistsAPI.deleteTask(todolistId, taskId)
		.then(() => {
			dispatch(setRemoveLoadingAC('idel'))
			 dispatch(removeTaskAC(todolistId, taskId))
		})
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType):AppThunk =>
	(dispatch, getState: () => AppRootStateType) => {
	const state = getState()

		const task = state.tasks[todolistId].find(t => t.id === taskId)
	if (task) {


		let apiModel: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline,
			status: task.status,
			...domainModel
		}
		todolistsAPI.updateTask(todolistId, taskId, apiModel)
			.then(() => {
				return dispatch(updateTaskAC(todolistId, taskId, domainModel))
			})
	}
}

//TYPES
type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type ActionsTasksType =
	| RemoveTodolistACType
	| CreateTodolistACType
	| SetTodolistsACType
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof createTaskAC>
	| ReturnType<typeof setTasksAC>
