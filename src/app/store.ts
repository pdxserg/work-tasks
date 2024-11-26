import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { ActionsTodosType, todolistsReducer } from "../model/todolistsSlice"
import { tasksReducer } from "../model/tasksSlice"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "../model/appSlice"
import { authReducer } from "../model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppActionTypes = ActionsTodosType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
