import {errorAC, setRemoveLoadingAC} from "../model/app-reducer";
import {AppThunkDispatch} from "../app/store";
import {ResponseDomainType} from "../api/todolists-api";


export const handleServerNetworkError =(err:{message:string}, dispatch:AppThunkDispatch)=>{

	dispatch(setRemoveLoadingAC('idel'))
	dispatch(errorAC(err.message))
}
export const handleServerAppError =<T,>(dispatch:AppThunkDispatch, data:ResponseDomainType<T> )=>{
		dispatch(errorAC(data.messages[0]))
		dispatch(setRemoveLoadingAC('idel'))

}

