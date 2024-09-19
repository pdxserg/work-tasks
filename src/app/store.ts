import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionsTodosType, todolistsReducer} from "../model/todolists-reducer";
import {ActionsTasksType, tasksReducer} from "../model/tasks-reducer";
import thunk, { ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {ActionsLoadingType, appReducer} from "../model/app-reducer";

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType= ReturnType<typeof store.getState>

export type AppActionTypes = ActionsTodosType | ActionsTasksType|ActionsLoadingType

export type AppThunk<ReturnType= void>  =ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionTypes>
  export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store