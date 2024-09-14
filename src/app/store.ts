import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {todolistsReducer} from "../model/todolists-reducer";
import {tasksReducer} from "../model/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType= ReturnType<typeof store.getState>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

  export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store