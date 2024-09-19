import {todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionTypes} from "../app/store";

export type IsLoadingType ='idel'|'loading'|'error'

const initialstate = {
	status:'idel' as IsLoadingType
}
export type InitialstateType= typeof initialstate
export const appReducer = (state:InitialstateType = initialstate, action: AppActionTypes):InitialstateType  => {
	switch (action.type) {
		case 'APP/SET_STATUS': {
			return {...state, status: action.value}
		}
		case 'APP/REM_STATUS': {
			return {...state, status: action.value}
		}




		default: {
			return state
		}
	}

}

export const setStatusAC = (value:IsLoadingType) => ({type: 'APP/SET_STATUS', value} as const)
export const removeLoadingAC = (value:IsLoadingType) => ({type: 'APP/REM_STATUS', value} as const)



//THUNK
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.getTasks(todolistId)
		.then((res) => {

		})
}

//TYPES
export type ActionsLoadingType =
	|ReturnType<typeof setStatusAC>
	|ReturnType<typeof removeLoadingAC>

