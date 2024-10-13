import { error, setRemoveLoading } from "../model/appSlice"
import { AppThunk, AppThunkDispatch } from "../app/store"
import { ResponseDomainType } from "../api/todolists-api"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppThunkDispatch) => {
    dispatch(setRemoveLoading({ value: "idel" }))
    dispatch(error({ value: err.message }))
}
export const handleServerAppError = <T,>(dispatch: AppThunkDispatch, data: ResponseDomainType<T>) => {
    dispatch(error({ value: data.messages[0] }))
    dispatch(setRemoveLoading({ value: "idel" }))
}
