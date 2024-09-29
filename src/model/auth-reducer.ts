import {AppThunk} from "../app/store";
import {LoginType} from "../features/login/Login";
import {authAPI} from "../api/todolists-api";
import {errorAC, isInitializedAC, setRemoveLoadingAC} from "./app-reducer";
import {handleServerNetworkError} from "../common/utils";
import {Dispatch} from "redux";


const initialstate = {
	isLogin:false
}
export type InitialstateType = typeof initialstate
export const authReducer = (state: InitialstateType = initialstate, action: ActionsLogibnType): InitialstateType => {
	switch (action.type) {
		case 'AUTH/IS-LOGIN': {
			return {...state, isLogin: action.value}
		}
		default: {
			return state
		}
	}


}

export const isLoginAC = (value: boolean) => ({type: 'AUTH/IS-LOGIN', value} as const)



	export const isLoginTC = (data: LoginType): AppThunk => (dispatch:Dispatch) => {
		dispatch(setRemoveLoadingAC("loading"))
		authAPI.login (data)
			.then((res) => {
				if (res.data.resultCode !== 0) {
					dispatch(errorAC(res.data.messages[0]))
					dispatch(setRemoveLoadingAC('idel'))
				} else {
					dispatch(setRemoveLoadingAC('idel'))
					dispatch(isLoginAC(true))
				}
			})
			.catch((err)=>{
				handleServerNetworkError(err, dispatch)
			})
	}
export const authMeTC = (): AppThunk => (dispatch:Dispatch) => {
	dispatch(setRemoveLoadingAC("loading"))
	authAPI.me ()
		.then((res) => {
			if (res.data.resultCode !== 0) {
				dispatch(errorAC(res.data.messages[0]))
				dispatch(setRemoveLoadingAC('idel'))
			} else {
				dispatch(setRemoveLoadingAC('idel'))
				dispatch(isLoginAC(true))

			}
		})
		.catch((err)=>{
			handleServerNetworkError(err, dispatch)
		})
		.finally(()=>{
			dispatch(isInitializedAC(true))

		})

}
//TYPES
export type ActionsLogibnType =ReturnType<typeof isLoginAC>


