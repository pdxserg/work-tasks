import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type IsLoadingType = "idel" | "loading" | "error"

const appSlice = createSlice({
    name: "app",
    initialState: {
        status: "idel" as IsLoadingType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setRemoveLoading: (state, action: PayloadAction<{ value: IsLoadingType }>) => {
            state.status = action.payload.value
        },
        error: (state, action: PayloadAction<{ value: string | null }>) => {
            state.error = action.payload.value
        },
        isInitialize: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
})

export const appReducer = appSlice.reducer
export const { setRemoveLoading, error, isInitialize } = appSlice.actions
