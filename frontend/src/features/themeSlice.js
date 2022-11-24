import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeBackground:'has-background-dark has-text-white',
    themeContent: 'site-page-header-ghost-wrapper'
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        reset: (state) => initialState,
        update:(state,action)=>{
            state.themeBackground = action.payload.value ? 'has-background-dark has-text-light':'site-layout-background'
            state.themeContent = action.payload.value ? 'has-background-black-ter has-text-light': 'site-page-header-ghost-wrapper'
        }
    }
});

export const { reset,update } = themeSlice.actions;
export default themeSlice.reducer;