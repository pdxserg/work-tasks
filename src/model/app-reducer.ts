import {AppActionTypes} from "../app/store";

export type IsLoadingType = 'idel' | 'loading' | 'error'

const initialstate = {
	status: 'idel' as IsLoadingType,
	error: null as string | null
}
export type InitialstateType = typeof initialstate
export const appReducer = (state: InitialstateType = initialstate, action: AppActionTypes): InitialstateType => {
	switch (action.type) {
		case 'APP/SET_LOADING': {
			return {...state, status: action.value}
		}
		case 'APP/SET_LOADING': {
			return {...state, status: action.value}
		}

		default: {
			return state
		}
	}


}

export const setLoadingAC = (value: IsLoadingType) => ({type: 'APP/SET_LOADING', value} as const)
export const removeLoadingAC = (value: IsLoadingType) => ({type: 'APP/SET_LOADING', value} as const)



//TYPES
export type ActionsLoadingType =
	| ReturnType<typeof setLoadingAC>
	| ReturnType<typeof removeLoadingAC>

