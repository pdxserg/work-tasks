import {AppActionTypes} from "../app/store";

export type IsLoadingType = 'idel' | 'loading' | 'error'

const initialstate = {
	status: 'idel' as IsLoadingType,
	error: null as string | null,
	isInitialized: false
}
export type InitialstateType = typeof initialstate
export const appReducer = (state: InitialstateType = initialstate, action: AppActionTypes): InitialstateType => {
	switch (action.type) {
		case 'APP/SET/REMOVE_LOADING': {
			return {...state, status: action.value}
		}
		case "APP/ERROR":{
			return {...state, error: action.value}
		}
		case "APP/IS-INITIALIZED":{
			return {...state, isInitialized: action.isInitialized}
		}

		default: {
			return state
		}
	}


}

export const setRemoveLoadingAC = (value: IsLoadingType) => ({type: 'APP/SET/REMOVE_LOADING', value} as const)
export const errorAC = (value: string|null) => {
	return {type: 'APP/ERROR', value} as const
}
export const isInitializedAC = (isInitialized: boolean) => {
	return {type: 'APP/IS-INITIALIZED', isInitialized} as const
}


//TYPES
export type ActionsLoadingType =
	| ReturnType<typeof setRemoveLoadingAC>
	| ReturnType<typeof errorAC>
	| ReturnType<typeof isInitializedAC>


