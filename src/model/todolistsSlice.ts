import { FilterTodolist } from "../components/Todolist"
import { todolistsAPI, TodolistType } from "../api/todolists-api"
import { AppThunk } from "../app/store"
import { error, IsLoadingType, setRemoveLoading } from "./appSlice"
import { handleServerAppError, handleServerNetworkError } from "../common/utils"
import { setTasksTC } from "./tasks-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        createTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            // [{ ...action.payload.todolist, filter: "all", entityStatus: "idel" }, ...state]
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idel" })
        },
        updateTodlistTitleAC: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeFilterAC: (state, action: PayloadAction<{ id: string; value: FilterTodolist }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.value
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string; status: IsLoadingType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
        logOutAC: (state, action: PayloadAction<{}>) => {
            state = []
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            // action.payload.todolists.map((t: any) => ({ ...t, filter: "all", entityStatus: "idel" }))
            action.payload.todolists.forEach((t) => {
                state.push({ ...t, filter: "all", entityStatus: "idel" })
            })
        },
    },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    removeTodolistAC,
    createTodolistAC,
    changeTodolistEntityStatusAC,
    changeFilterAC,
    updateTodlistTitleAC,
    logOutAC,
    setTodolistsAC,
} = todolistsSlice.actions

// THUNK
export const setTodoTC = (): AppThunk => (dispatch) => {
    dispatch(setRemoveLoading({ value: "loading" }))

    todolistsAPI
        .getTodolists()
        .then((res) => {
            dispatch(setRemoveLoading({ value: "idel" }))
            dispatch(setTodolistsAC({ todolists: res.data }))
            return res.data
        })
        .then((todo) => {
            todo.forEach((todo) => {
                dispatch(setTasksTC(todo.id))
            })
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodoTC =
    (id: string): AppThunk =>
    (dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))
        dispatch(changeTodolistEntityStatusAC({ id, status: "loading" }))
        todolistsAPI
            .deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    handleServerAppError(dispatch, res.data)
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(removeTodolistAC({ id }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const createTodoTC =
    (title: string): AppThunk =>
    (dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))
        todolistsAPI
            .createTodolist(title)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    handleServerAppError(dispatch, res.data)
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(createTodolistAC({ todolist: res.data.data.item }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const updateTodoTC =
    (id: string, title: string): AppThunk =>
    (dispatch) => {
        todolistsAPI
            .updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    dispatch(error({ value: res.data.messages[0] }))
                    dispatch(setRemoveLoading({ value: "idel" }))
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(updateTodlistTitleAC({ id, title }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }

// TYPES
export type TodolistDomainType = TodolistType & {
    filter: FilterTodolist
    entityStatus: IsLoadingType
}

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type CreateTodolistACType = ReturnType<typeof createTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type LogOutACType = ReturnType<typeof logOutAC>

export type ActionsTodosType = SetTodolistsACType | CreateTodolistACType | RemoveTodolistACType | LogOutACType
