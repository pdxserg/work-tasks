import axios, {AxiosResponse} from "axios";
import {LoginType} from "../features/login/Login";


const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		     'API-KEY': '0cf8f030-760b-4a29-809e-99a5bcf4660a'
	}
})
//AUTH API

export const authAPI = {
	login(data:LoginType){
		return instance.post<ResponseDomainType<{ userId: number }>>('/auth/login', data);
	},
	me(){
	return instance.get<ResponseDomainType<{
		id: number,
		email: string,
		login: string
	}>>('/auth/me')
	}
}
// api
export const todolistsAPI = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists');
	},
	createTodolist(title: string) {
		return instance.post
		< ResponseDomainType<{ item: TodolistType }>, AxiosResponse<ResponseDomainType<{ item: TodolistType }>>, {title: string} >
		('todo-lists', {title});
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseDomainType>(`todo-lists/${id}`);
	},
	updateTodolist(id: string, title: string) {
		return instance.put<ResponseDomainType, AxiosResponse<ResponseDomainType>, { title: string }>(`todo-lists/${id}`, {title});
	},
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseDomainType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseDomainType<{ item: TaskType }>, AxiosResponse<ResponseDomainType<{ item: TaskType }>>, {
			title: string
		}>(`todo-lists/${todolistId}/tasks`, {title});
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseDomainType<{ item: TaskType }>, AxiosResponse<ResponseDomainType<{
			item: TaskType
		}>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
	}
}

// TYPES
export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}
export type ResponseDomainType<D = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}
export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}
type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}
