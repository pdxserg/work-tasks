import {errorAC, setRemoveLoadingAC} from "../model/app-reducer";

export const handleServerNetworkError =(err:any, dispatch:any)=>{

	dispatch(setRemoveLoadingAC('idel'))
	dispatch(errorAC(err.message))
}