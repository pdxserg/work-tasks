import { TasksStateType } from "../app/App"
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "../api/todolists-api"
import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "../app/store"
import { handleServerNetworkError } from "../common/utils"
import { error, setRemoveLoading } from "./appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createTodolistAC, removeTodolistAC, setTodolistsAC } from "./todolistsSlice"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: {
        setTasksAC: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        removeTaskAC: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex((todo) => todo.id === action.payload.taskId)
            if (index !== -1) task.splice(index, 1)
        },
        createTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            const task = state[action.payload.task.todoListId]
            task.unshift(action.payload.task)
        },
        updateTaskAC: (
            state,
            action: PayloadAction<{ todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType }>,
        ) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex((todo) => todo.id === action.payload.taskId)
            if (index !== -1) {
                task[index] = { ...task[index], ...action.payload.domainModel }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        })
    },
})

export const tasksReducer = tasksSlice.reducer
export const { removeTaskAC, setTasksAC, createTaskAC, updateTaskAC } = tasksSlice.actions

//THUNK
export const setTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch: Dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))

        todolistsAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(setRemoveLoading({ value: "idel" }))
                dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const createTaskTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))
        todolistsAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    dispatch(error({ value: res.data.messages[0] }))
                    dispatch(setRemoveLoading({ value: "idel" }))
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(createTaskAC({ task: res.data.data.item }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const deleteTaskTC =
    (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))
        todolistsAPI
            .deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    dispatch(error({ value: res.data.messages[0] }))
                    dispatch(setRemoveLoading({ value: "idel" }))
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(removeTaskAC({ todolistId, taskId }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState()

        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (task) {
            let apiModel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: task.status,
                ...domainModel,
            }
            todolistsAPI
                .updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode !== 0) {
                        dispatch(error({ value: res.data.messages[0] }))
                        dispatch(setRemoveLoading({ value: "idel" }))
                    } else {
                        dispatch(setRemoveLoading({ value: "idel" }))
                        dispatch(updateTaskAC({ todolistId, taskId, domainModel }))
                    }
                })
                .catch((err) => {
                    handleServerNetworkError(err, dispatch)
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
