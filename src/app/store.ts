import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../model/todolists-reducer";
import {tasksReducer} from "../model/tasks-reducer";

const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type RootState= ReturnType<typeof store.getState>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store