import {AppActionTypes} from "../app/store";

export type IsLoadingType = 'idel' | 'loading' | 'error'

const initialstate = {
}
export type InitialstateType = typeof initialstate
export const authReducer = (state: InitialstateType = initialstate, action: AppActionTypes): InitialstateType => {
	switch (action.type) {

		default: {
			return state
		}
	}


}

export const setRemoveLoadingAC = (value: IsLoadingType) => ({type: 'APP/SET/REMOVE_LOADING', value} as const)



//TYPES
export type ActionsLoadingType =any


