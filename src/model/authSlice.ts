import { AppThunk } from "../app/store"
import { LoginType } from "../features/login/Login"
import { authAPI } from "../api/todolists-api"
import { error, isInitializedAC, setRemoveLoading } from "./appSlice"
import { handleServerNetworkError } from "../common/utils"
import { Dispatch } from "redux"
import { logOutAC } from "./todolists-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: { isLogin: false },
    reducers: {
        setIsLogin: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLogin = action.payload.value
        },
    },
})

export const authReducer = authSlice.reducer
export const { setIsLogin } = authSlice.actions

// export type InitialstateType = typeof initialstate
// export const _authReducer = (state: InitialstateType = initialstate, action: ActionsLogibnType): InitialstateType => {
//     switch (action.type) {
//         case "AUTH/IS-LOGIN": {
//             return { ...state, isLogin: action.value }
//         }
//         default: {
//             return state
//         }
//     }
// }

// export const isLoginAC = (isLogin: boolean) => ({ type: "AUTH/IS-LOGIN", isLogin }) as const

export const isLoginTC =
    (data: LoginType): AppThunk =>
    (dispatch: Dispatch) => {
        dispatch(setRemoveLoading({ value: "loading" }))
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode !== 0) {
                    dispatch(error({ value: res.data.messages[0] }))
                    dispatch(setRemoveLoading({ value: "idel" }))
                } else {
                    dispatch(setRemoveLoading({ value: "idel" }))
                    dispatch(setIsLogin({ value: true }))
                }
            })
            .catch((err) => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const logOutTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setRemoveLoading({ value: "loading" }))
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode !== 0) {
                dispatch(error({ value: res.data.messages[0] }))
                dispatch(setRemoveLoading({ value: "idel" }))
            } else {
                dispatch(setRemoveLoading({ value: "idel" }))
                dispatch(setIsLogin({ value: false }))
                dispatch(logOutAC())
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const authMeTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setRemoveLoading({ value: "loading" }))
    authAPI
        .me()
        .then((res) => {
            if (res.data.resultCode !== 0) {
                dispatch(error({ value: res.data.messages[0] }))
                dispatch(setRemoveLoading({ value: "idel" }))
            } else {
                dispatch(setRemoveLoading({ value: "idel" }))
                dispatch(setIsLogin({ value: true }))
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(isInitializedAC(true))
        })
}
//TYPES
// export type ActionsLogibnType = ReturnType<typeof isLoginAC>
